import { useRef } from 'react'
import { useSelector } from 'react-redux'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogFormRef = useRef()

  const blogs = useSelector(({ blogs }) => blogs)

  const toggleVisibility = () => blogFormRef.current.toggleVisibility()

  const blogStyle = {
    display: 'flex',
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 5
  }

  return (
    <>
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm toggleVisibility={toggleVisibility} />
      </Togglable>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link key={blog.id} style={blogStyle} to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        ))}
    </>
  )
}

export default BlogList
