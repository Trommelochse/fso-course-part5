import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogAppUser')
    setUser(null)
  }

  const handleBlogSubmit = async (e) => {
    e.preventDefault()
    blogService.setToken(user.token)
    const newBlog = await blogService.create({
      author: blogAuthor,
      title: blogTitle,
      url: blogUrl
    })
    console.log(newBlog)
    setBlogs([...blogs, newBlog])
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
          <input type="submit" />
        </form>
      </>
    )
  }
  
  const blogForm = () => {
    return (
    <>
      <h3>Submit new Blog as {user.username} </h3>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <label>Title</label>
          <input onChange={(e) => handleInputChange(e, setBlogTitle)} />
        </div>
        <div>
          <label>Author</label>
          <input onChange={(e) => handleInputChange(e, setBlogAuthor)} />        
        </div>
        <div>
          <label>URL</label>
          <input onChange={(e) => handleInputChange(e, setBlogUrl)} />        
        </div>
        <input type="submit" />
      </form>
    </>
    )
  }

  const blogList = () => (
    <>
      <p>Logged in as <strong>{ user.username }</strong> { user.name ? ` (${user.name})` : null }</p>
      <button onClick={handleLogout}>Log out</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  return (
    <div>
      {
        user 
          ? <>
            {blogForm()}
            {blogList()}
            </>
          : loginForm()
      }
    </div>
  )
}

export default App