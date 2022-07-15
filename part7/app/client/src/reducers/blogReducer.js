import { createSlice } from '@reduxjs/toolkit'
import { getAll, createBlog, likeBlog, deleteBlog } from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    like: (state, action) => {
      const id = action.payload
      const blogToLike = state.find(blog => blog.id === id)
      const likedBlog = { ...blogToLike,
        votes: blogToLike.votes += 1
      }
      state = state.map(blog => blog.id !== id ? blog : likedBlog)
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

export const likeABlog = (id) => {
  return async dispatch => {
    const likedBlog = await likeBlog(id)
    dispatch(like(likedBlog.id))
  }
}

export const deleteABlog = (id) => {
  return async dispatch => {
    dispatch(removeBlog(id))
    await deleteBlog(id)
  }
}

export default blogSlice.reducer