import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlogForm from '../CreateBlogForm'

describe('<CreateBlogForm />', () => {
  test('Create Blog form updates parent state and calls onSubmit', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<CreateBlogForm handleCreateBlog={createBlog} />)

    const title = screen.getByPlaceholderText('Blog Title')
    const author = screen.getByPlaceholderText('Blog Author')
    const url = screen.getByPlaceholderText('Blog URL')

    const createBlogButton = screen.getByText('Create')

    await user.type(title, 'Test Title')
    await user.type(author, 'Test Author')
    await user.type(url, 'www.test.com')

    await user.click(createBlogButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
  })
})