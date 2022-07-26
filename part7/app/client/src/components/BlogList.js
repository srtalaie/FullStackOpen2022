import { useRef } from 'react'
import { useSelector } from 'react-redux'

import Blog from '../components/Blog'
import Togglable from './Togglable'
import CreateBlogForm from './CreateBlogForm'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.slice().sort((a, b) => (b.likes - a.likes)))

  const blogFormRef = useRef()

  return (
    <>
      <h2>blogs</h2>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
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