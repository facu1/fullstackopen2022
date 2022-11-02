import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Card } from 'primereact/card'

const BlogList = () => {
  const blogFormRef = useRef()

  const blogs = useSelector(({ blogs }) => blogs)

  const toggleVisibility = () => blogFormRef.current.toggleVisibility()

  const titleBodyTemplate = (rowData) => {
    return (
      <Link key={rowData.id} to={`/blogs/${rowData.id}`}>
        {rowData.title}
      </Link>
    )
  }

  return (
    <Card title="Blogs">
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
      <DataTable value={blogs.slice().sort((a, b) => b.likes - a.likes)}>
        <Column header="Title" body={titleBodyTemplate} />
        <Column field="author" header="Author"></Column>
      </DataTable>
    </Card>
  )
}

export default BlogList
