import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('render only title and author by default', () => {
  const blog = {
    title: 'Title 1',
    author: 'Author 1',
    url: 'Url 1',
    likes: 1,
    user: { username: 'user1' }
  }

  const user = {
    username: 'user1'
  }

  const { container } = render(<Blog blog={blog} actualUser={user} />)

  const element = container.querySelector('#blogTitleAuthor')
  screen.debug(element)
  expect(element).not.toHaveStyle('display: none;')
  expect(element).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(element).not.toHaveTextContent(`${blog.url} ${blog.likes}`)
})

test('render url and likes when view button has been clicked', async () => {
  const blog = {
    title: 'Title 1',
    author: 'Author 1',
    url: 'Url 1',
    likes: 1,
    user: { username: 'user1' }
  }

  const user = { username: 'user1' }

  const { container } = render(<Blog blog={blog} actualUser={user} />)

  const userSession = userEvent.setup()

  const button = container.querySelector('#blogTitleAuthorBttn')
  await userSession.click(button)

  const titleAuthorElement = container.querySelector('#blogTitleAuthor')
  screen.debug(titleAuthorElement)
  expect(titleAuthorElement).toHaveStyle('display: none;')

  const infoElement = container.querySelector('#blogInfo')
  screen.debug(infoElement)
  expect(infoElement).not.toHaveStyle('display: none;')
  expect(infoElement).toHaveTextContent(`${blog.url}likes ${blog.likes}`)
})