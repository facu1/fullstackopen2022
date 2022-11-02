import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { createComment } from '../reducers/blogReducer'

import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

import './CommentForm.css'

const CommentForm = () => {
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const match = useMatch('/blogs/:id')

  const handleSubmit = (e) => {
    e.preventDefault()
    const newComment = { content: comment }
    dispatch(createComment(match.params.id, newComment))
    setComment('')
  }

  const handleChange = (e) => {
    setComment(e.target.value)
  }
  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <InputText
        className="comment-form__input"
        value={comment}
        onChange={handleChange}
      />
      <Button
        className="comment-form__button"
        label="Add Comment"
        type="submit"
      />
    </form>
  )
}

export default CommentForm
