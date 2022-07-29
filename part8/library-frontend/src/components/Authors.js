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
							{authors.data.allAuthors.map((a) => (
								<tr key={a.name}>
									<td>{a.name}</td>
									<td>{a.born}</td>
									<td>{a.bookCount}</td>
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
