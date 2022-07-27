import { createSlice } from '@reduxjs/toolkit'
import { getAll, createBlog, updateBlog, deleteBlog } from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like: (state, action) => {
      const updatedBlog = action.payload
      const id = updatedBlog._id
      return state.map(blog => blog._id !== id ? blog : updatedBlog)
    },
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    setBlogs: (state, action) => {
      return action.payload
    },
    removeBlog: (state, action) => {
      let id = action.payload
      state = state.filter(blog => blog.id === id)
    }
  }
})

export const { like, appendBlog, setBlogs, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const allBlogs = await getAll()
    dispatch(setBlogs(allBlogs))
  }
}

export const makeBlog = (content) => {
  return async dispatch => {
    const newBlog = await createBlog(content)
    dispatch(appendBlog(newBlog))
  }
}

export const likeABlog = (id, blog) => {
  return async dispatch => {
    const likedBlog = await updateBlog(id, blog)
    dispatch(like(likedBlog))
  }
}

export const deleteABlog = (id) => {
  return async dispatch => {
    await deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer