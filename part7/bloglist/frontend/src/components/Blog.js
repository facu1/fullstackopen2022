import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

import { useMatch, useNavigate } from 'react-router-dom'
import CommentForm from './CommentForm'

const Blog = () => {
  const actualUser = useSelector(({ user }) => user)
  const blogs = useSelector(({ blogs }) => blogs)

  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null

  const navigate = useNavigate()

  const dispatch = useDispatch()

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
    navigate('/')
  }

  if (!blog) return <></>

  return (
    <div className="blog">
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        likes {blog.likes}
        <button onClick={likeBlog} className="likeBttn">
          like
        </button>
      </div>
      <div>added by {blog.author}</div>
      {actualUser.username === blog.user.username && (
        <button
          style={{ background: 'cyan' }}
          onClick={deleteBlog}
          className="removeBttn"
        >
          remove
        </button>
      )}
      <h3>comments</h3>
      <CommentForm />
      <ul>
        {blog.comments.map(({ id, content }) => (
          <li key={id}>{content}</li>
        ))}
      </ul>
    </div>
  )
}

export default Blog
