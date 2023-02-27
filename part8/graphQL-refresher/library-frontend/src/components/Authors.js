import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {
	const authors = useQuery(ALL_AUTHORS)
	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
		onError: (error) => {
			const errors = error.graphQLErrors
			const messages = Object.values(errors)
				.map((e) => e.message)
				.join("\n")
			props.setError(messages)
		},
	})

	const [editedYear, setEditedYear] = useState("")
	const [currentAuthor, setCurrentAuthor] = useState("")

	const editYear = (event) => {
		event.preventDefault()

		editAuthor({
			variables: { name: currentAuthor, born: parseInt(editedYear) },
		})

		setCurrentAuthor("")
		setEditedYear("")
	}

	const handleChange = (event) => {
		event.preventDefault()
		setCurrentAuthor(event.target.value)
	}

	if (!props.show) {
		return null
	}

	if (authors.loading) {
		return <div>loading...</div>
	}

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.data.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				<h3>Edit Authors</h3>
				<select onChange={handleChange}>
					{authors.data.allAuthors.map((a) => (
						<option key={a.name} value={a.name}>
							{a.name}
						</option>
					))}
				</select>
				<div>
					born:
					<input
						value={editedYear}
						onChange={({ target }) => setEditedYear(target.value)}
					/>
					<button onClick={editYear}>Submit</button>
				</div>
			</div>
		</div>
	)
}

export default Authors
