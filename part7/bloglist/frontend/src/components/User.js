import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

const User = () => {
  const users = useSelector(({ users }) => users)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!users.length) dispatch(initializeUsers())
  }, [users, dispatch])

  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  if (!user) return <></>

  return (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  )
}

export default User
