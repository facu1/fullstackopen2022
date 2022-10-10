import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { notificationChange, resetNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    )
  })
  const dispatch = useDispatch()

  const sortedAnecdotes = anecdotes.slice().sort((a, b) => b.votes - a.votes)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(notificationChange(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(resetNotification())
    }, 5000);
  }

  return (
    <div>
    {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
