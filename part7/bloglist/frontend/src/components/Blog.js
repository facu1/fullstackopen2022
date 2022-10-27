import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

const Blog = ({ blog, actualUser }) => {
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideStyle = { display: 'none' }

  const toggleExpanded = () => setExpanded(!expanded)

  const likeBlog = () => {
    const { id, user, likes, author, title, url } = blog
    const blogWithUserId = { id, likes, author, title, url, user: user.id }
    blogWithUserId.likes += 1

    dispatch(updateBlog(id, blogWithUserId))
  }

  const deleteBlog = () => {
    const { id, title, author } = blog

    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      dispatch(removeBlog(id))
    }
  }

  return (
    <div style={blogStyle} className="blog">
      <div style={expanded ? hideStyle : {}} className="blogTitleAuthor">
        {blog.title} {blog.author}
        <button onClick={toggleExpanded} className="blogTitleAuthorBttn">
          view
        </button>
      </div>
      <div style={expanded ? {} : hideStyle} className="blogInfo">
        <div>
          {blog.title}
          <button onClick={toggleExpanded}>view</button>
        </div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button onClick={likeBlog} className="likeBttn">
            like
          </button>
        </div>
        <div>{blog.author}</div>
        {actualUser.username === blog.user.username && (
          <button
            style={{ background: 'cyan' }}
            onClick={deleteBlog}
            className="removeBttn"
          >
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
