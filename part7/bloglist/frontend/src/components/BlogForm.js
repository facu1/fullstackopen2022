import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import { Card } from 'primereact/card'

import './BlogForm.css'

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
    <Card className="blog-form" title="Create New">
      <form onSubmit={addBlog}>
        <span className="p-float-label blog-form__fields">
          <InputText
            id="title-input"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            className="blog-form__input"
          />
          <label htmlFor="title-input">Title</label>
        </span>
        <span className="p-float-label blog-form__fields">
          <InputText
            id="author-input"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            className="blog-form__input"
          />
          <label htmlFor="author-input">Author</label>
        </span>
        <span className="p-float-label blog-form__fields">
          <InputText
            id="url-input"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            className="blog-form__input"
          />
          <label htmlFor="url-input">Url</label>
        </span>
        <Button label="Create" id="submit-bttn" />
      </form>
    </Card>
  )
}

export default BlogForm
