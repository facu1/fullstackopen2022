import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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
      dispatch(setNotification('Fails wrong username or password', 3))
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.toggleVisibility()
      dispatch(
        setNotification(
          `Succeeds a new blog ${blogObject.title} by ${blogObject.author} added`,
          3
        )
      )
    } catch (exception) {
      dispatch(setNotification('Fails something wrong adding new blog', 3))
      throw Error()
    }
  }

  const likeBlog = async (blogToLike) => {
    const returnedBlog = await blogService.likeBlog(blogToLike)

    setBlogs(
      blogs.map((blog) => (blog.id === returnedBlog.id ? blogToLike : blog))
    )
  }

  const deleteBlog = async (blogId) => {
    await blogService.deleteBlog(blogId)

    setBlogs(blogs.filter((blog) => blog.id !== blogId))
  }

  return (
    <div>
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      ) : (
        <>
          <h2>blogs</h2>
          <Notification />
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                handleLike={likeBlog}
                actualUser={user}
                handleDelete={deleteBlog}
              />
            ))}
        </>
      )}
    </div>
  )
}

export default App
