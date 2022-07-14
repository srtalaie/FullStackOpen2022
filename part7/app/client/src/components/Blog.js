import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { deleteBlog } from '../services/blogs'
import { likeABlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const handleDeleteBlog = async (blogId, blog) => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      try {
        await deleteBlog(blogId)
        dispatch(setNotification('Blog was successfully Deleted'))
      } catch (exception) {
        dispatch(setNotification('Something went wrong'))
      }
    }
  }

  const handleLikes = (blog) => {
    dispatch(likeABlog(blog._id))
    dispatch(setNotification(`You liked ${blog.title}`))
  }

  const handleRemove = (event) => {
    event.preventDefault()
    handleDeleteBlog(blog._id, blog)
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} - {blog.author} <button id="view-hide-btn" onClick={handleVisibility}>{isVisible ? 'hide' : 'view'}</button>
      {isVisible ?
        <div>
          <div className="blog-link">link: {blog.url}</div>
          <div className="blog-likes">likes: {blog.likes}<button className="like-btn" onClick={() => { handleLikes(blog) }}>like</button></div>
        </div>
        : <></>
      }
      <button id="remove-btn" onClick={handleRemove}>remove</button>
    </div>
  )
}

export default Blog