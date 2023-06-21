import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    // anecdotes.map(anecdote => console.log('content',anecdote.content, 'votes', anecdote.votes))
    const filterText = filter
    if(filterText === '' || filterText === null || filterText === undefined){
      const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
      return sortedAnecdotes
    }
    else {
      const filteredAnecdotes = anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filterText.toLowerCase()))
      // return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
      const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
      return sortedAnecdotes
    }
  })
  const dispatch = useDispatch()

  const vote = (item) => {
    dispatch(voteForAnecdote(item))
  }

  return (

    anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
  )


}

export default AnecdoteList