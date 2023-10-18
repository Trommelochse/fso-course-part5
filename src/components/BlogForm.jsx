import { useState } from 'react'

const BlogForm = ({ user, addBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleInputChange = (e, fn) => {
    fn(e.target.value)
  }

  const handleBlogSubmit = (e) => {
    e.preventDefault()
    const newBlog = { title, author, url }
    addBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const formStyle = {
    marginBottom: 20
  }

  const inputStyle = {
    display: 'inline-block',
    width: 250,
    fontSize: 20,
    marginLeft: 15,
    marginBottom: 10
  }

  const labelStyle = {
    display: 'inline-block',
    minWidth: 80
  }

  return (
    <>
      <h3>Submit new Blog as {user.username} </h3>
      <form onSubmit={handleBlogSubmit} style={formStyle}>
        <div>
          <label style={labelStyle}>Title</label>
          <input
            onChange={(e) => handleInputChange(e, setTitle)}
            value={title}
            style={inputStyle}
            placeholder='Enter title'
          />
        </div>
        <div>
          <label style={labelStyle}>Author</label>
          <input
            onChange={(e) => handleInputChange(e, setAuthor)}
            value={author}
            style={inputStyle}
            placeholder='Enter author'
          />
        </div>
        <div>
          <label style={labelStyle}>URL</label>
          <input
            onChange={(e) => handleInputChange(e, setUrl)}
            value={url}
            style={inputStyle}
            placeholder='Enter URL'
          />
        </div>
        <input type="submit" className='primary' />
      </form>
    </>
  )
}

export default BlogForm