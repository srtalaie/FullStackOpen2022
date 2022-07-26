import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.slice().sort((a, b) => (b.likes - a.likes)))

  const blogFormRef = useRef()

  return (
    <>
      <h2>blogs</h2>
      <div>
        {blogs.map(blog =>
          <div key={blog._id} style={blogStyle}>
            <Link to={`blogs/${blog._id}`}>{blog.title}</Link>
          </div>
        )}
        <div>
          <h2>Create new blog</h2>
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <CreateBlogForm />
          </Togglable>
        </div>
      </div>
    </>

  )
}

export default BlogList