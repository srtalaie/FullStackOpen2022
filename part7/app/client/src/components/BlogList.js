import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { Box } from '@mui/material'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs.slice().sort((a, b) => (b.likes - a.likes)))

  return (
    <Box>
      <h2>blogs</h2>
      <Box>
        {blogs.map(blog =>
          <Box key={blog._id} style={blogStyle}>
            <Link to={`blogs/${blog._id}`}>{blog.title}</Link>
          </Box>
        )}
        <Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BlogList