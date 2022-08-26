const {
	UserInputError,
	AuthenticationError,
	gql,
} = require("apollo-server-express")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const Author = require("./models/Author")
const Book = require("./models/Book")
const User = require("./models/User")

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
			let book = null

			if (!currentUser) {
				throw new AuthenticationError("not authenticated")
			}
			try {
				let author = await Author.findOne({ name: args.author })

				if (!author) {
					author = new Author({ name: args.author })
				}

				book = new Book({ ...args, author: author })
				await book.save()

				author.bookCount = author.bookCount.concat(book.id)
				await author.save()
			} catch (error) {
				throw new UserInputError(error.message, {
					invalidArgs: args,
				})
			}

			pubsub.publish("BOOK_ADDED", { bookAdded: book })
			console.log(book)
			return book
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
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
		},
	},
}

module.exports = resolvers
