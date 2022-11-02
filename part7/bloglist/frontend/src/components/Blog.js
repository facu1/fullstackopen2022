import { useDispatch, useSelector } from 'react-redux'
import { removeBlog, updateBlog } from '../reducers/blogReducer'

import { useMatch, useNavigate } from 'react-router-dom'
import CommentForm from './CommentForm'

import { Card } from 'primereact/card'
import { Button } from 'primereact/button'

import './Blog.css'

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
    <Card
      className="blog"
      title={blog.title}
      subTitle={`added by ${blog.author}`}
    >
      <a
        className="blog__link"
        href={blog.url}
        target="_blank"
        rel="noreferrer"
      >
        {blog.url}
      </a>
      <div className="blog__buttons">
        <Button
          className="blog__like-btn"
          label={`Like ${blog.likes}`}
          icon="pi pi-heart"
          onClick={likeBlog}
        />
        {actualUser.username === blog.user.username && (
          <Button
            className="p-button-secondary"
            label="Remove"
            icon="pi pi-trash"
            onClick={deleteBlog}
          />
        )}
      </div>
      <CommentForm />
      <div className="blog__comments">
        {blog.comments.map(({ id, content }) => (
          <Card className="blog__comment" key={id}>
            {content}
          </Card>
        ))}
      </div>
    </Card>
  )
}

export default Blog
