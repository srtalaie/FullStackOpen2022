import { useMutation, useQueryClient } from "react-query"

import { addAnAnecdote } from "../requests"

import { useNotificationDispatch } from "../NotificationContext"

const AnecdoteForm = () => {
	const dispatch = useNotificationDispatch()
	const queryClient = useQueryClient()

	const newAnecdoteMutation = useMutation(addAnAnecdote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData("anecdotes")
			queryClient.setQueryData("anecdotes", anecdotes.concat(newAnecdote))
		},
		onError: () => {
			dispatch({
				type: "create",
				payload:
					"An error occured. Make sure anecodte is at least 5 characters long.",
			})
			setTimeout(() => {
				dispatch({ type: "remove" })
			}, 5000)
		},
	})

	//Add Anecdotes
	const addAnecdote = async (event) => {
		event.preventDefault()
		const newAnecdote = event.target.anecdote.value
		event.target.anecdote.value = ""
		newAnecdoteMutation.mutate({ content: newAnecdote, votes: 0 })
		dispatch({ type: "create", payload: `created: ${newAnecdote}` })
		setTimeout(() => {
			dispatch({ type: "remove" })
		}, 5000)
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={addAnecdote}>
				<input name="anecdote" />
				<button type="submit">create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
