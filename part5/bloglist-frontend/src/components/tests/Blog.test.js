import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../Blog'

describe('<Blog />', () => {
  let container
  const blog = {
    title: 'This is a Test Blog',
    author: 'Test Blogger',
    url: 'www.url.com',
    likes: 1
  }

  beforeEach(() => {
    container = render(<Blog blog={blog} />).container
  })

  test('Blog component renders blog with title and author, not Likes/Link initially', () => {
    const visibleElements = screen.getByText(`${blog.title} - ${blog.author}`)
    const blogLink = container.querySelector('.blog-link')
    const blogLikes = container.querySelector('.blog-likes')

    expect(visibleElements).toBeDefined()
    expect(blogLink).toBeNull()
    expect(blogLikes).toBeNull()
  })

  test('Clicking on "View/Hide" button shows and hides extra blog content', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const blogLink = container.querySelector('.blog-link')
    const blogLikes = container.querySelector('.blog-likes')

    expect(blogLink).toBeDefined()
    expect(blogLikes).toBeDefined()

    const hideButton = screen.getByText('hide')
    await user.click(hideButton)

    expect(blogLink).toBeDefined()
    expect(blogLikes).toBeDefined()
  })
})