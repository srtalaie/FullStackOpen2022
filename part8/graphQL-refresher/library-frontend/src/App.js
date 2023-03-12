import { useState } from "react"

import { useApolloClient, useSubscription } from "@apollo/client"

import { ALL_BOOKS, BOOK_ADDED } from "./queries"

import Authors from "./components/Authors"
import Books from "./components/Books"
import LoginForm from "./components/LoginForm"
import NewBook from "./components/NewBook"
import Notify from "./components/Notify"
import Recommend from "./components/Recommend"

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
	const [page, setPage] = useState("authors")
	const [errorMessage, setErrorMessage] = useState(null)
	const [token, setToken] = useState(null)
	const client = useApolloClient()

	useSubscription(BOOK_ADDED, {
		onSubscriptionData: ({ subscriptionData }) => {
			const addedBook = subscriptionData.data.bookAdded
			updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
			window.alert(
				`New Book: ${subscriptionData.data.bookAdded.title} (${subscriptionData.data.bookAdded.published}) - by ${subscriptionData.data.bookAdded.author.name} has been added`
			)
		},
	})

	const notify = (message) => {
		setErrorMessage(message)
		setTimeout(() => {
			setErrorMessage(null)
		}, 10000)
	}

	const logout = () => {
		setToken(null)
		localStorage.clear()
		client.resetStore()
	}

	if (!token) {
		return (
			<>
				<Notify errorMessage={errorMessage} />
				<LoginForm setToken={setToken} setError={notify} />
			</>
		)
	}

	return (
		<div>
			<Notify errorMessage={errorMessage} />
			<div>
				<button onClick={logout}>logout</button>
				<button onClick={() => setPage("authors")}>authors</button>
				<button onClick={() => setPage("books")}>books</button>
				<button onClick={() => setPage("add")}>add book</button>
				<button onClick={() => setPage("recommend")}>recommend</button>
			</div>
			<Authors show={page === "authors"} setError={notify} />

			<Books show={page === "books"} />

			<NewBook show={page === "add"} setError={notify} />

			<Recommend show={page === "recommend"} />
		</div>
	)
}

export default App
