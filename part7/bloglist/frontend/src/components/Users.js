import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'

const Users = () => {
  const users = useSelector(({ users }) => users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
export default Users