import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async newBlog => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (id, newBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, newBlog)
  const response = await request
  return response.data
}

const likeBlog = async (id) => {
  const blogToLike = await axios.get(`${baseUrl}/${id}`)
  const likedBlog = { ...blogToLike.data,
    likes: blogToLike.data[0].likes += 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, likedBlog)
  return response.data
}

const addComment = async (id, comment) => {
  const commentedBlog = await axios.get(`${baseUrl}/${id}`)
  const comments = commentedBlog.data[0].comments
  comments.push(comment)
  const blogWithComment = { ...commentedBlog.data[0],
    comments: comments
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogWithComment)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

export { getAll, setToken, createBlog, updateBlog, deleteBlog, likeBlog, addComment }