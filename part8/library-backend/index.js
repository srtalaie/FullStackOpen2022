require("dotenv").config()
const jwt = require("jsonwebtoken")
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core")
const http = require("http")
const express = require("express")

const {
	ApolloServer,
	UserInputError,
	AuthenticationError,
	gql,
} = require("apollo-server-express")

const mongoose = require("mongoose")
const Author = require("./models/Author")
const Book = require("./models/Book")
const User = require("./models/User")

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connection to MongoDB:", error.message)
	})

const typeDefs = gql`
	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: [String]!
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
		favouriteGenre: String!
		id: ID!
	}
	type Token {
		value: String!
	}
	type Query {
		bookCount: Int!
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors: [Author!]!
		me: User
	}
	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]!
		): Book!
		editAuthor(name: String!, setBornTo: Int!): Author
		createUser(username: String!, favoriteGenre: String!): User
		login(username: String!, password: String!): Token
	}
`

const resolvers = {
	Query: {
		bookCount: async () => await Book.collection.countDocuments(),
		authorCount: async () => await Author.collection.countDocuments(),
		allAuthors: async () => await Author.find({}),
		me: (root, args, context) => {
			return context.currentUser
		},
		allBooks: async (root, args) => {
			if (args.author && args.genre) {
				const author = await Author.findOne({ name: args.author })
				return Book.find({
					$and: [
						{ author: { $in: author.id } },
						{ genres: { $in: args.genre } },
					],
				}).populate("author")
			}

			if (args.author) {
				const author = await Author.findOne({ name: args.author })
				return Book.find({ author: { $in: author.id } }).populate("author")
			}

			if (args.genre) {
				return Book.find({ genres: { $in: args.genre } }).populate("author")
			}

			return Book.find({}).populate("author")
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError("not authenticated")
			}
			try {
				let author = await Author.findOne({ name: args.author })

				if (!author) {
					author = new Author({ name: args.author })
				}

				const book = new Book({ ...args, author: author.id })
				await book.save()
				author.bookCount = author.bookCount.concat(book.id)
				await author.save()
				return book
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
		},
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new AuthenticationError("not authenticated")
			}
			try {
				await Author.findOneAndUpdate(
					{ name: args.name },
					{
						born: args.setBornTo,
					}
				)
				return await Author.findOne({ name: args.name })
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}
		},
		createUser: async (root, args) => {
			const user = new User({
				username: args.username,
				favouriteGenre: args.favoriteGenre,
			})

			return user.save().catch((error) => {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			})
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username })

			if (!user || args.password !== "secret") {
				throw new UserInputError("wrong credentials")
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}

			return { value: jwt.sign(userForToken, JWT_SECRET) }
		},
	},
}

const serverStart = async () => {
	const app = express()
	const httpServer = http.createServer(app)

	const server = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req }) => {
			const auth = req ? req.headers.authorization : null
			if (auth && auth.toLowerCase().startsWith("bearer ")) {
				const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
				const currentUser = await User.findById(decodedToken.id)
				return { currentUser }
			}
		},
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							server.close()
						},
					}
				},
			},
		],
	})

	await server.start()

	server.applyMiddleware({
		app,
		path: "/",
	})

	const PORT = 4000

	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${PORT}`)
	)
}

serverStart()
