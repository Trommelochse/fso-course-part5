import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

test('Renders title and author but no details ', () => {
  const blogObj = {
    title: 'Title',
    author: 'Author',
    url: 'https://google.com',
    likes: 42
  }

  const updateLikes = jest.fn()
  const deleteBlog = jest.fn()

  render(<Blog blog={blogObj} updateLikes={updateLikes} deleteBlog={deleteBlog}/>)

  const titleElement = screen.queryByText('Title')
  const authorElement = screen.queryByText('Author')
  const urlElement = screen.queryByText('https://google.com')
  const likesElement = screen.queryByText('42')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})

test('Renders all information after "Show Details" button was clicked', () => {
  const blogObj = {
    title: 'Title',
    author: 'Author',
    url: 'https://google.com',
    likes: 42
  }

  const updateLikes = jest.fn()
  const deleteBlog = jest.fn()

  render(<Blog blog={blogObj} updateLikes={updateLikes} deleteBlog={deleteBlog}/>)

  const user = userEvent.setup()

  const button = screen.getByRole('button')
  user.click(button)

  const titleElement = screen.queryByText('Title')
  const authorElement = screen.queryByText('Author')
  const urlElement = screen.queryByText('https://google.com')
  const likesElement = screen.queryByText('42')

  expect(titleElement).toBeDefined()
  expect(authorElement).toBeDefined()
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('If like button is clicked twice, respective event handler is called twice', async () => {
  const blogObj = {
    title: 'Title',
    author: 'Author',
    url: 'https://google.com',
    likes: 42,
    user: {
      name: 'Clemens',
      username: 'root'
    }
  }

  const updateLikes = jest.fn()
  const deleteBlog = jest.fn()

  render(<Blog blog={blogObj} updateLikes={updateLikes} deleteBlog={deleteBlog}/>)

  const user = userEvent.setup()
  const showMoreButton = screen.getByRole('button')
  await user.click(showMoreButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(updateLikes.mock.calls).toHaveLength(2)
})