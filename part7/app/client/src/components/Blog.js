import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { likeABlog, deleteABlog, addAComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = () => {
  const [comment, setComment] = useState('')
  const [commentDate, setCommentDate] = useState(null)

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

  const handleChange = (event) => {
    setComment(event.target.value)
  }

  const handleComment = async () => {
    dispatch(addAComment(blog._id, comment))
    setCommentDate(new Date())
    setComment('')
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
      <div>
        <h3>Comments</h3>
        <input type="text" name="comment" value={comment} onChange={handleChange}></input>
        <button onClick={handleComment}>Add Comment</button>
        <div>
          {blog.comments.length === 0 ?
            <div>No comments yet</div> :
            <ul>
              {blog.comments.map(comment => <li key={commentDate}>{comment}</li>)}
            </ul>
          }
        </div>
      </div>
      <button id="remove-btn" onClick={handleRemove}>remove</button>
    </div>
  )
}

export default Blog