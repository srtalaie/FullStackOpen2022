import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

import { setToken } from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'

import login from './services/login'

const App = () => {
  const blogs = useSelector((state) => state.blogs.slice().sort((a, b) => (b.likes - a.likes)))
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [blogs, dispatch])

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
    <div>
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
            <h2>{user.name} is logged in<span><button id="logout-btn" onClick={handleLogout}>logout</button></span></h2>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
          <div>
            <h2>Create new blog</h2>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <CreateBlogForm />
            </Togglable>
          </div>
        </>
      }
    </div>
  )
}

export default App