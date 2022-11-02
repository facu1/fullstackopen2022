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

import { Menubar } from 'primereact/menubar'

const App = () => {
  const user = useSelector(({ user }) => user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUser())
  }, [dispatch])

  const handleLogout = () => dispatch(removeUser())

  const menuItems = [
    {
      label: 'Blogs',
      icon: 'pi pi-file-edit',
      template: (item, options) => (
        <Link className={options.className} to="/">
          blogs
        </Link>
      )
    },
    {
      label: 'Users',
      icon: 'pi pi-user',
      template: (item, options) => (
        <Link className={options.className} to="/users">
          users
        </Link>
      )
    },
    {
      label: `${user?.name} logged in`,
      template: (item, options) => <p>{item.label}</p>
    },
    {
      label: 'Logout',
      icon: 'pi pi-sign-out',
      command: handleLogout
    }
  ]

  return (
    <div>
      {user === null ? (
        <LoginForm />
      ) : (
        <>
          <Menubar model={menuItems} />
          <Notification />
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
