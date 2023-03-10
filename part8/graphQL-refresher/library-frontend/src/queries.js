import { gql } from "@apollo/client"

export const ALL_BOOKS = gql`
	query {
		allBooks {
			title
			author {
				name
			}
			published
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

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`
