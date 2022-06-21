import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { intitalizeAnecdotes } from './reducers/anecdoteReducer'

import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {

const dispatch = useDispatch()
useEffect(() => {
  dispatch(intitalizeAnecdotes())
}, [dispatch])

  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App