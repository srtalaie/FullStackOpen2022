import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = (props) => {
	const [name, setName] = useState("")
	const [birthYear, setBirthYear] = useState("")

	const authors = useQuery(ALL_AUTHORS)

	const [editAuthor] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	})

	const handleEditAuthor = (event) => {
		event.preventDefault()

		editAuthor({ variables: { name, setBornTo: birthYear } })

		setName("")
		setBirthYear("")
	}

	if (!props.show) {
		return null
	}

	return (
		<div>
			{authors.loading ? (
				<div>...loading</div>
			) : (
				<div>
					<h2>authors</h2>
					<table>
						<tbody>
							<tr>
								<th></th>
								<th>born</th>
								<th>books</th>
							</tr>
							{authors.data.allAuthors.map((author) => (
								<tr key={author.name}>
									<td>{author.name}</td>
									<td>{author.born}</td>
									<td>{author.bookCount}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
			<div>
				<form onSubmit={handleEditAuthor}>
					<input
						type="text"
						label="name"
						value={name}
						onChange={({ target }) => setName(target.value)}
					></input>
					<input
						type="number"
						label="born"
						value={birthYear}
						onChange={({ target }) => setBirthYear(parseInt(target.value))}
					></input>
					<button type="submit">edit author</button>
				</form>
			</div>
		</div>
	)
}

export default Authors
