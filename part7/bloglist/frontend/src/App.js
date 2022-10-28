import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, removeUser } from './reducers/userReducer'

import { Routes, Route, Link } from 'react-router-dom'
import BlogList from './components/BlogList'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogout = () => dispatch(removeUser())

  const padding = {
    padding: 5
  }

  const margin = {
    marginLeft: 5
  }

  const navStyle = {
    background: 'lightgrey',
    padding: 5
  }

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <div style={navStyle}>
            <Link style={padding} to="/">
              blogs
            </Link>
            <Link style={padding} to="/users">
              users
            </Link>
            {user.name} logged in
            <button style={margin} onClick={handleLogout}>
              logout
            </button>
          </div>
          <Notification />
          <h2>blog app</h2>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/blogs/:id" element={<Blog />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
