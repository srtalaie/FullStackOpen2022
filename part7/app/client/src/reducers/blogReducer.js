import { createSlice } from '@reduxjs/toolkit'
import { getAll, createBlog, updateBlog, deleteBlog, addComment } from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    updateABlog: (state, action) => {
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
      return state.filter(blog => blog._id !== id)
    }
  }
})

export const { updateABlog, appendBlog, setBlogs, removeBlog } = blogSlice.actions

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
    dispatch(updateABlog(likedBlog))
  }
}

export const deleteABlog = (id) => {
  return async dispatch => {
    await deleteBlog(id)
    dispatch(removeBlog(id))
  }
}

export const addAComment = (id, comment) => {
  return async dispacth => {
    const commentedBlog = await addComment(id, comment)
    dispacth(updateABlog(commentedBlog))
  }
}

export default blogSlice.reducer