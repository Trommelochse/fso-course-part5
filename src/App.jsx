import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleInputChange = (e, fn) => {
    fn(e.target.value)
  }

  const handleLoginSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      setToken(user.token)
      setUser(user)
    } catch (exception) {
      console.log(exception)
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
          <input type="submit" />
        </form>
      </>
    )
  }

  const blogList = () => {
    return (
      <>
        <p>Logged in as <strong>{ user.username }</strong></p>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  }

  return (
    <div>
      {
        user ? blogList() : loginForm()
      }
    </div>
  )
}

export default App