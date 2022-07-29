import { useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import Select from "react-select"

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

		editAuthor({ variables: { name: name.value, setBornTo: birthYear } })

		setName("")
		setBirthYear("")
	}

	if (!props.show) {
		return null
	}

	console.log(authors)

	return (
		<div>
			{authors.loading ? (
				<div>...loading</div>
			) : (
				<div>
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
					<div>
						<form onSubmit={handleEditAuthor}>
							<Select
								value={name}
								onChange={setName}
								options={authors.data.allAuthors.map((author) => ({
									value: author.name,
									label: author.name,
								}))}
							/>
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
			)}
		</div>
	)
}

export default Authors
