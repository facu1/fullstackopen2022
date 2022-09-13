import { useState } from "react"

const Blog = ({blog, handleLike}) => {
  const [expanded, setExpanded] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideStyle = { display : 'none'}

  const toggleExpanded = () => setExpanded(!expanded)
  
  const likeBlog = async () => {
    const { id, user, likes, author, title, url } = blog

    await handleLike({ id, user, likes, author, title, url })
  }

  return (
    <div style={blogStyle}>
      <div style={expanded ? hideStyle : {}}>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}>view</button>
      </div>
      <div style={expanded ? {} : hideStyle}>
        <div>{blog.title}<button onClick={toggleExpanded}>view</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button onClick={likeBlog}>like</button></div>
        <div>{blog.author}</div>
      </div>
    </div>
  )
}

export default Blog