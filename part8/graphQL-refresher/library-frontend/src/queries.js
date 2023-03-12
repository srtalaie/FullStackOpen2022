import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
	fragment BookDetails on Book {
		title
		published
		author {
			name
		}
		genres
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`

export const ME = gql`
	query {
		me {
			favoriteGenre
		}
	}
`

export const ALL_BOOKS = gql`
	query {
		allBooks {
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

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`

export const ADD_BOOK = gql`
	mutation (
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String]!
	) {
		addBook(
			title: $title
			published: $published
			author: { name: $author }
			genres: $genres
		) {
			...BookDetails
		}
	}
	${BOOK_DETAILS}
`

export const EDIT_AUTHOR = gql`
	mutation ($born: Int!, $name: String!) {
		editAuthor(born: $born, name: $name) {
			name
			born
			bookCount
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
