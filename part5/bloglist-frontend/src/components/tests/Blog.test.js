import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from '../Blog'

test('Blog component renders blog with title and author, not Likes/Link initially', () => {
  const blog = {
    title: 'This is a Test Blog',
    author: 'Test Blogger',
    url: 'www.url.com',
    likes: 1
  }

  const { container } = render(<Blog blog={blog} />)

  const visibleElements = screen.getByText(`${blog.title} - ${blog.author}`)
  const blogLink = container.querySelector('.blog-link')
  const blogLikes = container.querySelector('.blog-likes')

  expect(visibleElements).toBeDefined()
  expect(blogLink).toBeNull()
  expect(blogLikes).toBeNull()
})