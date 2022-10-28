import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const BlogList = () => {
  const blogFormRef = useRef()

  const user = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)

  const toggleVisibility = () => blogFormRef.current.toggleVisibility()

  return (
    <>
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
  )
}

export default BlogList
