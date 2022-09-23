import { useState } from 'react'

const Blog = ({ blog, handleLike, actualUser, handleDelete }) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideStyle = { display : 'none' }

  const toggleExpanded = () => setExpanded(!expanded)

  const likeBlog = async () => {
    const { id, user, likes, author, title, url } = blog

    await handleLike({ id, user, likes, author, title, url })
  }

  const deleteBlog = async () => {
    const { id, title, author } = blog

    if (window.confirm(`Remove blog ${title} by ${author}`)) {
      await handleDelete(id)
    }
  }

  return (
    <div style={blogStyle}>
      <div style={expanded ? hideStyle : {}} className='blogTitleAuthor'>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded} className='blogTitleAuthorBttn'>view</button>
      </div>
      <div style={expanded ? {} : hideStyle} className='blogInfo'>
        <div>{blog.title}<button onClick={toggleExpanded}>view</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={likeBlog} className='likeBttn'>like</button></div>
        <div>{blog.author}</div>
        {actualUser.username === blog.user.username &&
          <button style={{ background: 'cyan' }} onClick={deleteBlog}>
            remove
          </button>}
      </div>
    </div>
  )
}

export default Blog