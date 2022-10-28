import { useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser, removeUser } from './reducers/userReducer'

import { Routes, Route } from 'react-router-dom'
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
