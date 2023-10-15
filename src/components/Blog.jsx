import { useState } from "react"


const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
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
      <>
        <div>
          <span style={authorStyle}>by {blog.author}</span>
        </div>
        <div>
          <span><a href={blog.url}>{blog.url}</a></span>
        </div>
        <div>
          <span style={likesStyle}>{blog.likes} Likes.</span>
          <button className="secondary">Like</button>
        </div>
        <div>
          <span style={likesStyle}>Saved by {blog.user.name}</span>
        </div>
      </>
    )
  }

  return (
    <div style={ containerStyle }>
      <div style={titleContainerStyle}>
        <span style={titleStyle}>{blog.title}</span>
        <button onClick={toggleDetails}>{ showDetails ? 'Show less' : 'Show more' }</button>
      </div>
      { showDetails && blogDetails() }
    </div>  
  )
}


export default Blog