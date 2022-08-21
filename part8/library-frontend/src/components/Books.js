import { useState, useEffect } from "react"

import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_BOOKS_GENRES } from "../queries"

const Books = (props) => {
	const [selectedGenre, setSelectedGenre] = useState(null)
	const [genreArr, setGenreArr] = useState([])

	const books = useQuery(ALL_BOOKS)
	const genres = useQuery(ALL_BOOKS_GENRES)

	const onGenreSelection = () => {}

	if (!props.show) {
		return null
	}

	return (
		<div>
			<h2>books</h2>
			{books.loading ? (
				<div>...loading</div>
			) : (
				<div>
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
									<td>{book.author.name}</td>
									<td>{book.published}</td>
								</tr>
							))}
						</tbody>
					</table>
					{/* <div>
						{genres.data.allBooks.map((genre) => (
							<div>
								<button key={genre} onClick={onGenreSelection}>
									{genre}
								</button>
							</div>
						))}
					</div> */}
				</div>
			)}
		</div>
	)
}

export default Books
