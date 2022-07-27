import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { makeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { Button, TextField } from '@mui/material'

const CreateBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = () => {
    let newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      dispatch(makeBlog(newBlog))
      dispatch(setNotification(`A new blog was created: ${newBlog.title} by ${newBlog.author}`))
    } catch (exception) {
      dispatch(setNotification('Something went wrong'))
    }

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <TextField
          variant="standard"
          label="title"
          value={title}
          name="Title"
          id="title"
          placeholder='Blog Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        <TextField
          variant="standard"
          label="author"
          value={author}
          name="Author"
          id="author"
          placeholder='Blog Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <TextField
          variant="standard"
          label="url"
          value={url}
          name="URL"
          id="url"
          placeholder='Blog URL'
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <Button type="submit">Create</Button>
    </form>
  )
}

export default CreateBlogForm