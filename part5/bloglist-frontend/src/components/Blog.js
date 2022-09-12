import { useState } from "react"

const Blog = ({blog}) => {
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

  return (
    <div style={blogStyle}>
      <div style={expanded ? hideStyle : {}}>
        {blog.title} {blog.author}
        <button onClick={toggleExpanded}>view</button>
      </div>
      <div style={expanded ? {} : hideStyle}>
        <div>{blog.title}<button onClick={toggleExpanded}>view</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes}<button>like</button></div>
        <div>{blog.author}</div>
      </div>
    </div>
  )
}

export default Blog