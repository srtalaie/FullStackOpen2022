import { useQuery } from "@apollo/client"
import { ALL_Authors } from "../queries"

const Authors = (props) => {
	const authors = useQuery(ALL_Authors)

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
		</div>
	)
}

export default Authors
