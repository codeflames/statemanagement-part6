import { createSlice } from '@reduxjs/toolkit'
import anecdote from '../services/anecdote'
import { setNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    voteAnecdotes: (state, action) => {
      const id = action.payload.id
      return state.map(a => a.id !== id ? a : action.payload)
    },

    addNewAnecdote: (state, action) => {
      const content = action.payload
      return [...state, content]
    },

    setAnecdotes: (state, action) => {
      return action.payload
    }
  }
})

export const { voteAnecdotes, addNewAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initilizeAnecdotes = () => {
  return async dispatch => {
    const response = await anecdote.getAll()
    dispatch(setAnecdotes(response))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdote.createNewAnecdote(content)
    dispatch(addNewAnecdote(newAnecdote))
    dispatch(setNotification(`you created '${content}'`, 5))
  }
}

export const voteForAnecdote = (content) => {
  const id = content.id
  return async dispatch => {
    const changedAnecdote = { ...content, votes: content.votes + 1 }
    console.log('changedAnecdote', changedAnecdote)
    const response = await anecdote.voteAnecdote(id, changedAnecdote)
    dispatch(voteAnecdotes(response))
    dispatch(setNotification(`you voted '${response.content}'`, 5))

  }
}



export default anecdoteSlice.reducer