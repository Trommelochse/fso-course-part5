import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, updateLikes, deleteBlog, userId }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const incrementLikes = () => {
    updateLikes({ ...blog, likes: blog.likes + 1 })
  }

  const handleDelete = () => {
    if(window.confirm(`You are about to delete ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const containerStyle = {
    padding: '20px 40px',
    borderBottom: '1px solid lightgrey',
    fontFamily: 'arial'
  }

  const titleContainerStyle = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  const titleStyle = {
    fontSize: 18,
    fontWeight: 700
  }

  const authorStyle = {
    fontSize: 12,
    fontFamily: 'serif',
    color: '#adadad'
  }

  const likesStyle = {
    display: 'inline-block',
    marginRight: 20
  }

  const blogDetails = () => {
    return (
      <div className='blog-details'>
        <div>
          <span><a href={blog.url}>{blog.url}</a></span>
        </div>
        <div>
          <span style={likesStyle}>{blog.likes} Likes.</span>
          <button className="secondary" onClick={incrementLikes}>Like</button>
        </div>
        <div>
          <span style={likesStyle}>Saved by {blog.user.name}</span>
        </div>
        { blog.user.id === userId && <button className='danger' onClick={handleDelete}>Delete</button>  }
      </div>
    )
  }

  return (
    <div style={ containerStyle } className='blog-container'>
      <div style={titleContainerStyle}>
        <span style={titleStyle}>{blog.title}</span>
        <button onClick={toggleDetails}>{ showDetails ? 'Show less' : 'Show more' }</button>
      </div>
      <div>
        <span style={authorStyle}>by {blog.author}</span>
      </div>
      { showDetails && blogDetails() }
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateLikes: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  userId: PropTypes.string
}


export default Blog