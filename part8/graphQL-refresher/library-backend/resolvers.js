const { GraphQLError } = require("graphql")

const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET

const Author = require("./models/Author")
const Book = require("./models/Book")
const User = require("./models/User")

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
		me: (root, args, context) => {
			return context.currentUser
		},
	},
	Mutation: {
		addBook: async (root, args, context) => {
			const currentUser = context.currentUser
			let book = null

			if (!currentUser) {
				throw new GraphQLError("not authenticated")
			}
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
		editAuthor: async (root, args, context) => {
			const currentUser = context.currentUser

			if (!currentUser) {
				throw new GraphQLError("not authenticated")
			}

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
		createUser: async (root, args) => {
			try {
				let pwHash = await bcrypt.hash(args.password, 10)
				const user = new User({ ...args, passwordHash: pwHash })
				user.save()
				return user
			} catch (error) {
				throw new GraphQLError("Saving user failed", {
					extensions: {
						code: "BAD_USER_INPUT",
						invalidArgs: args,
						error,
					},
				})
			}
		},
		login: async (root, args) => {
			try {
				const user = await User.findOne({ username: args.username })

				const passwordCorrect =
					user === null
						? false
						: await bcrypt.compare(args.password, user.passwordHash)

				if (!(user && passwordCorrect)) {
					throw new UserInputError("wrong credentials")
				}

				const userForToken = {
					username: user.username,
					id: user._id,
				}

				return { value: jwt.sign(userForToken, JWT_SECRET) }
			} catch (error) {
				throw new GraphQLError("Login failed", {
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

module.exports = resolvers
