import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

test('Event handler is called with correct details', async () => {

  const user = {
    name: 'Tester',
    username: 'root'
  }
  const addBlog = jest.fn()

  render(<BlogForm user={user} addBlog={addBlog} />)

  const titleInput = screen.getByPlaceholderText('Enter title')
  const authorInput = screen.getByPlaceholderText('Enter author')
  const urlInput = screen.getByPlaceholderText('Enter URL')
  const button = screen.getByRole('button')

  const testUser = userEvent.setup()

  await testUser.type(titleInput, 'a')
  await testUser.type(authorInput, 'b')
  await testUser.type(urlInput, 'c')

  await testUser.click(button)
  expect(addBlog.mock.calls[0][0]).toEqual({ title: 'a', author: 'b', url: 'c' })

})