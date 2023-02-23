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
			author: $author
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
