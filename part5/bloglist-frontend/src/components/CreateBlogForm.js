import { useState } from 'react'

const CreateBlogForm = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()

    let newBlog = {
      title: title,
      author: author,
      url: url
    }

    handleCreateBlog(newBlog)

    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <>
        <form onSubmit={addBlog}>
            <div>
                title
                <input
                  type="text"
                  value={title}
                  name="Title"
                  onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                author
                <input
                  type="text"
                  value={author}
                  name="Author"
                  onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                url
                <input
                  type="text"
                  value={url}
                  name="URL"
                  onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">Create Blog</button>
        </form>
    </>
  )
}

export default CreateBlogForm