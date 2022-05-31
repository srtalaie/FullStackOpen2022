import React from 'react'

const CreateBlogForm = ({ title, author, url, handleCreateBlog, onChangeAuthor, onChangeTitle, onChangeUrl }) => {
  return (
    <>
        <form onSubmit={handleCreateBlog}>
            <div>
                title
                <input
                  type="text"
                  value={title}
                  name="Title"
                  onChange={onChangeTitle}
                />
            </div>
            <div>
                author
                <input
                  type="text"
                  value={author}
                  name="Author"
                  onChange={onChangeAuthor}
                />
            </div>
            <div>
                url
                <input
                  type="text"
                  value={url}
                  name="URL"
                  onChange={onChangeUrl}
                />
            </div>
            <button type="submit">Create Blog</button>
        </form>
    </>
  )
}

export default CreateBlogForm