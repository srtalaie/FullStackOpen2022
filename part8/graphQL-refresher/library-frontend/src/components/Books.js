import { useLazyQuery, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"

import { ALL_BOOKS, BOOKS_OF_GENRE } from "../queries"

const Books = (props) => {
	const result = useQuery(ALL_BOOKS)
	const [getBooksByGenre, genreResult] = useLazyQuery(BOOKS_OF_GENRE, {
		fetchPolicy: "no-cache",
	})
	const [genre, setGenre] = useState("all")
	const [books, setBooks] = useState(null)

	useEffect(() => {
		if (result.data) {
			setBooks(result.data.allBooks)
		}
	}, [result.data])

	useEffect(() => {
		if (genreResult.data) {
			setBooks(genreResult.data.allBooks)
		}
	}, [genreResult.data])

	if (!props.show || !books) {
		return null
	}

	if (result.loading || genreResult.loading) {
		return <div>loading...</div>
	}

	if (result.error || genreResult.error) {
		return <div>Something went wrong</div>
	}

	const { allBooks } = result.data

	const genres = [...new Set(allBooks.flatMap((b) => b.genres))].concat("all")

	console.log(allBooks.flatMap((b) => b.genres))

	const handleGenreClick = (genre) => {
		setGenre(genre)

		if (genre === "all") {
			setBooks(allBooks)
			return
		}

		getBooksByGenre({ variables: { genre: genre } })
	}

	return (
		<div>
			<h2>Books</h2>
			<p>
				in genre <strong>{genre}</strong>
			</p>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((b) => (
						<tr key={b._id}>
							<td>{b.title}</td>
							<td>{b.author.name}</td>
							<td>{b.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				{genres.map((genre) => (
					<button key={genre} onClick={() => handleGenreClick(genre)}>
						{genre}
					</button>
				))}
			</div>
		</div>
	)
}

export default Books
