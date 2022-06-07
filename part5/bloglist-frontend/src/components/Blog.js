import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [isVisible, setIsVisible] = useState(false)

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

  const handleLikes = (event) => {
    event.preventDefault()

    let updatedBlog = {
      title: blog.title,
      author: blog.author,
      userId: String(blog.user.id),
      likes: blog.likes += 1,
      url: blog.url
    }
    updateBlog(blog._id, updatedBlog)
  }

  const handleRemove = (event) => {
    event.preventDefault()

    removeBlog(blog._id, blog)
  }

  return (
    <div className="blog" style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={handleVisibility}>{isVisible ? 'hide' : 'view'}</button>
      {isVisible ?
        <div>
          <div className="blog-link">link: {blog.url}</div>
          <div className="blog-likes">likes: {blog.likes}<button className="like-btn" onClick={handleLikes}>like</button></div>
        </div>
        : <></>
      }
      <button onClick={handleRemove}>remove</button>
    </div>
  )
}

export default Blog