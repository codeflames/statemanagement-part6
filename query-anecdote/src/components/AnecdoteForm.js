import { useMutation, useQueryClient } from 'react-query'
import { createNewAnecdote } from '../requests'
import {useNotificationDispatch} from '../reducers/notificationReducer'


const AnecdoteForm = () => {

  const queryClient = new useQueryClient()

  const dispatch = useNotificationDispatch()



  const newAnecdote = useMutation(createNewAnecdote, {
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', [...anecdotes, newAnecdote])
      dispatch({
        type: 'SET_NOTIFICATION',
        data: `A new anecdote '${newAnecdote.content}' created!`
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION'
        })
      }
      , 5000)
    },
    onError: (error) => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: `${error.response.data.error}`
      })
      setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION'
        })
      }
      , 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdote.mutate(content)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
