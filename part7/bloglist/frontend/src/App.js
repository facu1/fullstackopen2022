import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, removeUser } from './reducers/userReducer'

const App = () => {
  const blogFormRef = useRef()

  const blogs = useSelector(({ blogs }) => blogs)

  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogout = () => dispatch(removeUser())

  const toggleVisibility = () => blogFormRef.current.toggleVisibility()

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <h2>blogs</h2>
          <Notification />
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm toggleVisibility={toggleVisibility} />
          </Togglable>
          {blogs
            .slice()
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} actualUser={user} />
            ))}
        </>
      )}
    </div>
  )
}

export default App
