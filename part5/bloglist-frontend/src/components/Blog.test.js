import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('render only title and author by default', () => {
  const blog = {
    title: 'Title 1',
    author: 'Author 1',
    url: 'Url 1',
    likes: '1',
    user: { username: 'user1' }
  }

  const user = {
    username: 'user1'
  }

  const { container } = render(<Blog blog={blog} actualUser={user} />)

  const element = container.querySelector('.blog')
  screen.debug(element)
  expect(element).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(element).not.toHaveTextContent(`${blog.url} ${blog.likes}`)
})