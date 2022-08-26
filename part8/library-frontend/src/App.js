import { useState, useEffect } from "react"

import { useApolloClient, useSubscription } from "@apollo/client"

import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Login from "./components/Login"
import Recommend from "./components/Recommend"

import { BOOK_ADDED, ALL_BOOKS } from "./queries"

export const updateCache = (cache, query, addedBook) => {
	const uniqByName = (a) => {
		let seen = new Set()
		return a.filter((item) => {
			let k = item.name
			return seen.has(k) ? false : seen.add(k)
		})
	}
	cache.updateQuery(query, ({ allBooks }) => {
		return {
			allBooks: uniqByName(allBooks.concat(addedBook)),
		}
	})
}

const App = () => {
	const [page, setPage] = useState("books")
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	useEffect(() => {
		const userToken = localStorage.getItem("library-user-token")
		if (userToken) {
			setToken(userToken)
		}
	}, [])

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
			updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
			window.alert(
				`New Book: ${subscriptionData.data.bookAdded.title} - ${subscriptionData.data.bookAdded.published} - by ${subscriptionData.data.bookAdded.author.name}`
			)
		},
	})

	const logout = () => {
		setToken(null)
		localStorage.clear()
		setPage("login")
		client.resetStore()
	}

	return (
		<div>
			<div>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				{token ? (
					<div>
						<button onClick={() => setPage("add")}>add book</button>
						<button onClick={() => setPage("recommend")}>recommend</button>
						<button onClick={logout}>logout</button>
					</div>
				) : (
					<button onClick={() => setPage("login")}>Go to login</button>
				)}
			</div>
			<Authors show={page === "authors"} />
			<Books show={page === "books"} />
			<NewBook show={page === "add"} />
			<Recommend show={page === "recommend"} />
			<Login show={page === "login"} setToken={setToken} setPage={setPage} />
		</div>
	)
}

export default App
