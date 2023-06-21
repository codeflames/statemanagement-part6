import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAllAnecdotes, updateAnecdote } from './requests'
import {useNotificationDispatch} from './reducers/notificationReducer'


const App = () => {

  const dispatch = useNotificationDispatch()

  const queryClient = new useQueryClient()


  const voteAnecdote = useMutation(updateAnecdote,{
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const updatedAnecdotes = anecdotes.map(anecdote => anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote)
      queryClient.setQueryData('anecdotes', updatedAnecdotes)
    dispatch({
        type: 'SET_NOTIFICATION',
        data: `Anecdote '${updatedAnecdote.content}' voted`
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION'
        })
      }
      , 5000)
    }
  })

  const handleVote = (anecdote) => {
 
    const votes = anecdote.votes + 1
    voteAnecdote.mutate({ ...anecdote, votes })
  }

  const { isLoading, isError, data, error } = useQuery({
    queryKey: 'anecdotes',
    queryFn: getAllAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false,
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }


  const anecdotes = data
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
