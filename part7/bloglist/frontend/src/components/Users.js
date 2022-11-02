import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Card } from 'primereact/card'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'

const Users = () => {
  const users = useSelector(({ users }) => users)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const nameBodyTemplate = (rowData) => {
    return <Link to={`/users/${rowData.id}`}>{rowData.name}</Link>
  }

  return (
    <Card title="Users">
      <DataTable value={users}>
        <Column header="Name" body={nameBodyTemplate} />
        <Column header="Blogs created" field="blogs.length"></Column>
      </DataTable>
    </Card>
  )
}
export default Users
