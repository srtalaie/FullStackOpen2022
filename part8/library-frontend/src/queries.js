import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		published
		author {
			name
			born
			bookCount
		}
		genres
	}
`

export const LOGIN = gql`
	mutation ($username: String!) {
		login(username: $username, password: "secret") {
			value
		}
	}
`

export const ME = gql`
	query {
		me {
			favouriteGenre
		}
	}
`

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const ALL_BOOKS = gql`
	query allBooks($author: String, $genre: String) {
		allBooks(author: $author, genre: $genre) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const ALL_BOOKS_GENRES = gql`
	query {
		allBooks {
			genres
		}
	}
`

export const BOOKS_OF_GENRE = gql`
	query allBooks($genre: String) {
		allBooks(genre: $genre) {
			title
			published
			author {
				name
			}
		}
	}
`

export const ADD_BOOK = gql`
	mutation (
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			author: $author
			published: $published
			genres: $genres
		) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
	mutation ($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`

export const BOOK_ADDED = gql`
	subscription {
		bookAdded {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`
