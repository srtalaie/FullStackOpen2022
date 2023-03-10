import { useQuery } from "@apollo/client"

import { useState } from "react"
import { BOOKS_OF_GENRE, ME } from "../queries"

const Recommend = (props) => {
	const [favoriteGenre, setFavoriteGenre] = useState(null)

	const user = useQuery(ME, {
		fetchPolicy: "no-cache",
		onCompleted: (data) => {
			setFavoriteGenre(data.me.favoriteGenre)
		},
	})

	const books = useQuery(BOOKS_OF_GENRE, {
		variables: { genre: favoriteGenre },
	})

	if (!props.show) {
		return null
	}

	if (user.loading || books.loading) {
		return <div>loading...</div>
	}

	const { allBooks } = books.data

	if (favoriteGenre === null) {
		return <p>You do not have a Favorite Genere Yet</p>
	}

	return (
		<div>
			<h2>Recommendations</h2>
			{allBooks.length > 0 ? (
				<div>
					<p>
						Books in your favorite genre <strong>{favoriteGenre}</strong>
					</p>
					<table>
						<tbody>
							<tr>
								<th>title</th>
								<th>author</th>
								<th>published</th>
							</tr>
							{allBooks.map((book, i) => (
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
					<strong>{favoriteGenre}</strong>
				</p>
			)}
		</div>
	)
}

export default Recommend
