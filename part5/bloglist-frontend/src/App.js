import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notification, setNotification] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification(`Fails wrong username or password`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()

    const newBlog = { title, author, url }

    try {
      const returnedBlog = await blogService.create(newBlog)

      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      blogFormRef.current.toggleVisibility()
      setNotification(`Succeeds a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setNotification(`Fails something wrong adding new blog`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  return (
    <div>
      {user === null
        ? <LoginForm
            handleLogin={handleLogin}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            notification={notification}
          />
        : <>
            <h2>blogs</h2>
            <Notification notification={notification} />
            <div>
              {user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </div>
            <Togglable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm
                handleCreateBlog={addBlog}
                fields={{title, setTitle, author, setAuthor, url, setUrl}}
              />
            </Togglable>
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </>
      }
    </div>
  )
}

export default App
