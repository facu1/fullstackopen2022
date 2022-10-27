import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    try {
      dispatch(createBlog({ title, author, url }))
      toggleVisibility()

      setTitle('')
      setAuthor('')
      setUrl('')

      dispatch(
        setNotification(`Succeeds a new blog ${title} by ${author} added`, 3)
      )
    } catch (exception) {
      dispatch(setNotification('Fails something wrong adding new blog', 3))
    }
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        title:
        <input
          id="title-input"
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author-input"
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url-input"
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="submit-bttn" type="submit">
        create
      </button>
    </form>
  )
}

export default BlogForm
