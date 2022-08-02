require("dotenv").config()

const { ApolloServer, UserInputError, gql } = require("apollo-server")

const mongoose = require("mongoose")
const Author = require("./models/Author")
const Book = require("./models/Book")

const MONGODB_URI = process.env.MONGODB_URI

const typeDefs = gql`
	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int!
	}
	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]
	}
	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
	}
	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]
		): Book!
		editAuthor(name: String!, setBornTo: Int!): Author
	}
`

const resolvers = {
	Query: {
		bookCount: async () => await Book.collection.countDocuments(),
		authorCount: async () => await Author.collection.countDocuments(),
		allBooks: async () => await Book.find({}).populate("author"),
		allAuthors: async () => await Author.find({}),
	},
	Mutation: {
		addBook: async (root, args) => {
			try {
				let author = await Author.findOne({ name: args.author })
				if (!author) {
					author = new Author({ name: args.author })
					await author.save()
				}

				const book = new Book({ ...args, author: author.id })
				return await book.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
		},
		editAuthor: async (root, args) => {
			const author = await Author.findOneAndUpdate(
				{ name: args.name },
				{
					born: args.setBornTo,
				}
			)
			return await Author.findOne({ name: args.name })
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
	console.log("connecting to", MONGODB_URI)

	mongoose
		.connect(MONGODB_URI)
		.then(() => {
			console.log("connected to MongoDB")
		})
		.catch((error) => {
			console.log("error connection to MongoDB:", error.message)
		})
})
