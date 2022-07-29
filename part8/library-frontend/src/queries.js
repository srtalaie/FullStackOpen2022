import { gql } from "@apollo/client"

export const ALL_Authors = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`
