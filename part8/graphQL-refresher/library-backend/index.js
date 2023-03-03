const { ApolloServer } = require("@apollo/server")
const { startStandaloneServer } = require("@apollo/server/standalone")
const mongoose = require("mongoose")
mongoose.set("strictQuery", false)
const Author = require("./models/Author")
const Book = require("./models/Book")

require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI)

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connection to MongoDB:", error.message)
	})

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
	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(name: String, genre: String): [Book!]!
		allAuthors: [Author!]!
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
	}
`

const resolvers = {
	Query: {
		bookCount: async () => {
			const results = await Book.collection.countDocuments()
			return results
		},
		authorCount: async () => {
			const results = await Author.collection.countDocuments()
			return results
		},
		allBooks: async (root, args) => {
			if (args.name && args.genre) {
				const author = await Author.findOne({ name: args.author })
				return Book.find({
					$and: [
						{ author: { $in: author.id } },
						{ genres: { $in: args.genre } },
					],
				}).populate("author")
			}

			if (args.name) {
				const author = await Author.findOne({ name: args.name })
				return Book.find({ author: { $in: author.id } }).populate("author")
			}

			if (args.genre) {
				return Book.find({ genres: { $in: args.genre } }).populate("author")
			}

			return Book.find({}).populate("author")
		},
		allAuthors: async () => {
			const results = await Author.find({})
			return results
		},
	},
	Mutation: {
		addBook: async (root, args) => {
			let book = null
			try {
				let author = await Author.findOne({ name: args.author.name })

				if (!author) {
					author = new Author({ name: args.author.name })
				}

				book = new Book({ ...args, author: author })
				author.bookCount = author.bookCount.concat(book.id)

				await author.save()
				await book.save()
				return book
			} catch (error) {
				throw new GraphQLError("Saving book failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args,
						error,
					},
				})
			}
		},
		editAuthor: async (root, args) => {
			try {
				const author = await Author.findOne({ name: args.name })
				author.born = args.born
				await author.save()
				return author
			} catch (error) {
				throw new GraphQLError("Saving author failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args,
						error,
					},
				})
			}
		},
	},
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
