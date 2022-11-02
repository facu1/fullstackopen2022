import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'

import { Card } from 'primereact/card'

import './User.css'

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
    <Card className="user" title={user.name}>
      <h3>Added blogs</h3>
      {user.blogs.map((blog) => (
        <Card className="user__blog" key={blog.id}>
          {blog.title}
        </Card>
      ))}
    </Card>
  )
}

export default User
