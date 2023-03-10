import { gql } from "@apollo/client"

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
			title
			author {
				name
			}
			published
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
	mutation ($born: Int!, $name: String!) {
		editAuthor(born: $born, name: $name) {
			name
			born
			bookCount
		}
	}
`
