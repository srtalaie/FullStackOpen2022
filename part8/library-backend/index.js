require("dotenv").config()
const jwt = require("jsonwebtoken")
const { ApolloServer } = require("apollo-server-express")
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core")
const { makeExecutableSchema } = require("@graphql-tools/schema")
const http = require("http")
const express = require("express")

const mongoose = require("mongoose")

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

const typeDefs = require("./schema")
const resolvers = require("./resolvers")

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("connected to MongoDB")
	})
	.catch((error) => {
		console.log("error connection to MongoDB:", error.message)
	})

const serverStart = async () => {
	const app = express()
	const httpServer = http.createServer(app)

	const schema = makeExecutableSchema({ typeDefs, resolvers })

	const server = new ApolloServer({
		schema,
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
