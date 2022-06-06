import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

import { getAll, createBlog, deleteBlog, setToken, updateBlog } from './services/blogs'
import login from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const setSortedBlogs = async () => {
    let blogs = await getAll()

    let sortedBlogs = blogs.sort((a, b) => (b.likes - a.likes))
    setBlogs(sortedBlogs)
  }

  useEffect(() => {
    setSortedBlogs()
  }, [])

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

  const handleCreateBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility()
    try {
      await createBlog(newBlog)
      setMessage(`A new blog was created: ${newBlog.title} by ${newBlog.author}`)
      setSortedBlogs()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Something went wrong')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleUpdateBlog = async (blogId, updatedBlog) => {
    try {
      await updateBlog(blogId, updatedBlog)
      setMessage('Blog was successfully updated')
      setSortedBlogs()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Something went wrong')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleDeleteBlog = async (blogId, blog) => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      try {
        await deleteBlog(blogId)
        setMessage('Blog was successfully Deleted')
        setSortedBlogs()
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      } catch (exception) {
        setMessage('Something went wrong')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    }
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
            <h2>{user.name} is logged in<span><button onClick={handleLogout}>logout</button></span></h2>
            <h2>blogs</h2>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} removeBlog={handleDeleteBlog}/>
            )}
          </div>
          <div>
            <h2>Create new blog</h2>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <CreateBlogForm
                handleCreateBlog={handleCreateBlog}
              />
            </Togglable>
          </div>
        </>
      }
    </div>
  )
}

export default App