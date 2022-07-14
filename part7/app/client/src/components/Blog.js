import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { updateBlog, deleteBlog } from '../services/blogs'
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

  const handleUpdateBlog = async (blogId, updatedBlog) => {
    try {
      await updateBlog(blogId, updatedBlog)
      dispatch(setNotification('Blog was successfully updated'))
    } catch (exception) {
      dispatch(setNotification('Something went wrong'))
    }
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

  const handleLikes = (event) => {
    event.preventDefault()

    let updatedBlog = {
      title: blog.title,
      author: blog.author,
      userId: String(blog.user.id),
      likes: blog.likes += 1,
      url: blog.url
    }
    handleUpdateBlog(blog._id, updatedBlog)
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
          <div className="blog-likes">likes: {blog.likes}<button className="like-btn" onClick={handleLikes}>like</button></div>
        </div>
        : <></>
      }
      <button id="remove-btn" onClick={handleRemove}>remove</button>
    </div>
  )
}

export default Blog