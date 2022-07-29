import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"

const Books = (props) => {
	const books = useQuery(ALL_BOOKS)

	if (!props.show) {
		return null
	}

	return (
		<div>
			<h2>books</h2>
			{books.loading ? (
				<div>...loading</div>
			) : (
				<table>
					<tbody>
						<tr>
							<th></th>
							<th>author</th>
							<th>published</th>
						</tr>
						{books.data.allBooks.map((book) => (
							<tr key={book.title}>
								<td>{book.title}</td>
								<td>{book.author}</td>
								<td>{book.published}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
		</div>
	)
}

export default Books
