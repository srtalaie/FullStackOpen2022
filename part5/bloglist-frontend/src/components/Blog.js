import { useState } from 'react'

const Blog = ({ blog }) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleVisibility = () => {
    setIsVisible(!isVisible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  return (
    <div style={blogStyle}>
      {blog.title} - {blog.author} <button onClick={handleVisibility}>{isVisible ? 'hide' : 'view'}</button>
      {isVisible ? 
        <div>
          <div>link: {blog.url}</div>
          <div>likes: {blog.likes}<button>like</button></div>
        </div> : <></>
      }
    </div>
  ) 
}

export default Blog