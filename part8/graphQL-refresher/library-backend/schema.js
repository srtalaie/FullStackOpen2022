const typeDefs = `
	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: [ID]
	}
	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}
	type User {
		username: String!
		password: String!
		favoriteGenre: String
		id: ID!
	}
	type Token {
		value: String!
	}
	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(name: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}
	input AuthorInput {
		name: String!
	}
	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: AuthorInput!
			genres: [String]!
		): Book
		editAuthor(
			name: String!
			born: Int!
		): Author
		createUser(
			username: String!
			password: String!
			favoriteGenre: String!
		): User
		login(
			username: String!
			password: String!
		): Token
	}
  type Subscription {
		bookAdded: Book!
	}
`
module.exports = typeDefs
