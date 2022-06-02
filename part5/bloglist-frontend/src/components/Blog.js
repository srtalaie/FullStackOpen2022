import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
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

  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={handleVisibility}>{isVisible ? 'hide' : 'view'}</button>
      {isVisible ? 
        <div>
          <div>link: {blog.url}</div>
          <div>likes: {blog.likes}<button onClick={handleLikes}>like</button></div>
        </div> 
        : <></>
      }
    </div>
  ) 
}

export default Blog