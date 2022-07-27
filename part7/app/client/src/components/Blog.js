import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { likeABlog, deleteABlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  let { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const blog = useSelector((state) => state.blogs.find(blog => blog._id === id))

  const handleLikes = () => {
    dispatch(likeABlog(blog._id, { ...blog, likes: blog.likes + 1 }))
    dispatch(setNotification(`You liked ${blog.title}`))
  }

  const handleRemove = async () => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      try {
        dispatch(deleteABlog(blog._id))
        dispatch(setNotification('Blog was successfully Deleted'))
        navigate('/')
      } catch (exception) {
        dispatch(setNotification('Something went wrong'))
      }
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <p>{blog.title} - {blog.author}</p>
      <div>
        <div className="blog-link">link: <a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></div>
        <div className="blog-likes">likes: {blog.likes}<button className="like-btn" onClick={handleLikes}>like</button></div>
      </div>
      <button id="remove-btn" onClick={handleRemove}>remove</button>
    </div>
  )
}

export default Blog