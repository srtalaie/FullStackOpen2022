import { useQuery } from "@apollo/client"

import { ALL_BOOKS, ME } from "../queries"

const Recommend = (props) => {
	const user = useQuery(ME, {
		fetchPolicy: "no-cache",
	})
	const books = useQuery(ALL_BOOKS)

	if (!props.show) {
		return null
	}

	if (user.loading || books.loading) {
		return <div>loading...</div>
	}

	const { favouriteGenre } = user.data.me
	const { allBooks } = books.data

	console.log(favouriteGenre)

	const bookRecommendations = allBooks.filter((book) =>
		book.genres.includes(favouriteGenre)
	)

	return (
		<div>
			<h2>Recommendations</h2>
			{bookRecommendations.length > 0 ? (
				<div>
					<p>
						Books in your favorite genre <strong>{favouriteGenre}</strong>
					</p>
					<table>
						<tbody>
							<tr>
								<th></th>
								<th>author</th>
								<th>published</th>
							</tr>
							{bookRecommendations.map((book, i) => (
								<tr key={i}>
									<td>{book.title}</td>
									<td>{book.author.name}</td>
									<td>{book.published}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p>
					No books have been added yet based on your favorite genre{" "}
					<strong>{favouriteGenre}</strong>
				</p>
			)}
		</div>
	)
}

export default Recommend
