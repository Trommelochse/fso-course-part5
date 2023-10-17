import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import loginService from './services/login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState()

  const blogFormRef = useRef()

  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll()
      setBlogs(blogs)
    })()
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('blogAppUser')
    if (loggedInUser) {
      blogService.setToken(loggedInUser.token)
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  const handleInputChange = (e, fn) => {
    fn(e.target.value)
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('blogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setNotification({ type:'error', message:'Wrong Username or Password' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUser')
    setUser(null)
  }

  const sortByLikes = () => {
    setBlogs([...blogs].sort((a, b) => b.likes - a.likes))
  }

  const addBlog = async (blog) => {
    blogService.setToken(user.token)
    const newBlog = await blogService.create(blog)
    newBlog.user = user
    setBlogs([...blogs, newBlog]) 
    setNotification({ type:'success', message: `Save Successful: "${newBlog.title}" by ${newBlog.author}` })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
    blogFormRef.current.toggleVisibility()
  }

  const updateLikes = async (blog) => {
    const updatedBlog = await blogService.update(blog)
    setBlogs(blogs.map( b => b.id !== updatedBlog.id ? b : updatedBlog ))
  }

  const deleteBlog = async (id) => {
    blogService.setToken(user.token)
    const response = await blogService.remove(id)
    if (response.status === 204) {
      setBlogs(blogs.filter(b => b.id !== id))
    }
  }

  const loginForm = () => {
    return (
      <>
        <h2>Log in to Application</h2>
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label>Username</label>
            <input value={username} onChange={(e) => handleInputChange(e, setUsername)} />
          </div>
          <div>
            <label>Password</label>
            <input type ="password" value={password} onChange={(e) => handleInputChange(e, setPassword)} />
          </div>
          <input type="submit" className='primary' value='Login'/>
        </form>
      </>
    )
  }

  const userInfo = () => {
    const userInfoStyle = {
      marginBottom: 30,
      padding: '15px 30px',
      boxShadow: '1px 3px 2px -1px rgba(0,0,0,0.4)',
      backgroundColor: '#c8c8c8'
    }
    return (
      <div style={userInfoStyle}>
        <p>Logged in as <strong>{ user.username }</strong> { user.name ? ` (${user.name})` : null }</p>
        <button className='secondary' onClick={handleLogout}>Log out</button>
      </div>
    )
  }

  const blogForm = () => (
    <Togglable buttonLabel='Create new Blog' ref={blogFormRef}>
      <BlogForm user={user} addBlog={addBlog} />
    </Togglable>
  )


  const blogList = () => (
    <>
      <h2>blogs</h2>
      <div><button className='secondary' onClick={sortByLikes}>Sort by Likes</button></div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          updateLikes={updateLikes}
          userId={user.id}
          deleteBlog={deleteBlog}
        />
      )}
    </>
  )

  const appStyle = {
    width: 960,
    margin: '0 auto',
    backgroundColor: '#ffffff',
  }

  return (
    <div style={appStyle}>
      { user && userInfo() }
      { notification && <Notification notification={notification} /> }
      {
        user 
          ? <>
            { blogForm() }
            { blogList() }
            </>
          : loginForm()
      }
    </div>
  )
}

export default App