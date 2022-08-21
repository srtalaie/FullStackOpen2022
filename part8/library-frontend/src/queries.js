import { gql } from "@apollo/client"

export const LOGIN = gql`
	mutation ($username: String!) {
		login(username: $username, password: "secret") {
			value
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
	query {
		allBooks {
			title
			published
			author {
				name
			}
			genres
		}
	}
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
			genres
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
			title
			author {
				name
			}
			published
			genres
		}
	}
`

export const EDIT_AUTHOR = gql`
	mutation ($name: String!, $setBornTo: Int!) {
		editAuthor(name: $name, setBornTo: $setBornTo) {
			name
			born
		}
	}
`
