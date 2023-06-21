import { createSlice } from '@reduxjs/toolkit'

// const filterReducer = (state = '', action) => {
//   switch(action.type) {
//     case 'FILTER':
//       if (action.payload === '') {
//         return ''
//       }
//       return action.payload
//     default:
//       return state
//   }

// }

// export const filterAnecdotes = (filter) => {
//   return {
//     type: 'FILTER',
//     payload: filter
//   }
// }

// export default filterReducer

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAnecdotes: (state, action) => {
      const filter = action.payload
      if (filter === '') {
        return ''
      }
      return filter
    },
  }

})

export const { filterAnecdotes } = filterSlice.actions

export default filterSlice.reducer