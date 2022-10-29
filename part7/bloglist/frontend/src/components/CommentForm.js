import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMatch } from 'react-router-dom'
import { createComment } from '../reducers/blogReducer'

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
    <form onSubmit={handleSubmit}>
      <input value={comment} onChange={handleChange} />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
