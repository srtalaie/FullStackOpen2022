import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { likeABlog, deleteABlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  let { id } = useParams

  const dispatch = useDispatch()

  let blog = useSelector((state) => state.blogs.find(blog => blog.id === id))

  const handleLikes = (blog) => {
    dispatch(likeABlog(blog._id))
    dispatch(setNotification(`You liked ${blog.title}`))
  }

  const handleRemove = async (blog) => {
    if (window.confirm(`Do you really want to delete ${blog.title}?`)) {
      try {
        dispatch(deleteABlog(blog._id))
        dispatch(setNotification('Blog was successfully Deleted'))
      } catch (exception) {
        dispatch(setNotification('Something went wrong'))
      }
    }
  }

  if (!blog) {
    return null
  }

  return (
    <div className="blog">
      <p>{blog.title} - {blog.author}</p>
      <div>
        <div className="blog-link">link: {blog.url}</div>
        <div className="blog-likes">likes: {blog.likes}<button className="like-btn" onClick={() => { handleLikes(blog) }}>like</button></div>
      </div>
      <button id="remove-btn" onClick={() => { handleRemove(blog) }}>remove</button>
    </div>
  )
}

export default Blog