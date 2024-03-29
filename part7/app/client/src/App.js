import { useState, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import Login from './components/Login'
import Notification from './components/Notification'
import BlogList from './components/BlogList'
import User from './components/User'
import UserTable from './components/UserTable'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import CreateBlogForm from './components/CreateBlogForm'

import { setToken } from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/userReducer'

import login from './services/login'
import NavMenu from './components/NavMenu'

import { Container } from '@mui/material'

const App = () => {
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  })

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await login({ username, password })
      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(user)
      )
      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBlogUser')
    setUser(null)
    setToken(null)
  }

  return (
    <Container>
      <Notification message={message} />
      {user === null ?
        <Login
          username={username}
          password={password}
          handleLogin={handleLogin}
          onChangeUsername={({ target }) => setUsername(target.value)}
          onChangePassword={({ target }) => setPassword(target.value)}
        />
        : <>
          <div>
            <NavMenu name={user.name} handleLogout={handleLogout} />
          </div>
          <h2>Create new blog</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <CreateBlogForm />
          </Togglable>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="users/:id" element={<User />} />
          </Routes>
        </>
      }
    </Container>
  )
}

export default App