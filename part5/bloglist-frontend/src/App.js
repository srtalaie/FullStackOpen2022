import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import Notification from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedInBlogUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
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
    blogService.setToken(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    blogFormRef.current.toggleVisibility()

    let newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      await blogService.createBlog(newBlog)
      setAuthor('')
      setTitle('')
      setUrl('')
      setMessage(`A new blog was created: ${title} by ${author}`)
      blogService.getAll().then(blogs =>
        setBlogs( blogs )
      )
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
                <Blog key={blog.id} blog={blog} />
              )}
            </div>
            <div>
              <h2>Create new blog</h2>
              <Togglable buttonLabel="new blog" ref={blogFormRef}>
                <CreateBlogForm 
                  title={title}
                  author={author}
                  url={url}
                  onChangeTitle={({ target }) => setTitle(target.value)}
                  onChangeAuthor={({ target }) => setAuthor(target.value)}
                  onChangeUrl={({ target }) => setUrl(target.value)}
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
