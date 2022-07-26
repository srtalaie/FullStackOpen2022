import { createSlice } from '@reduxjs/toolkit'

import { getAllUsers } from '../services/users'

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => {
      return action.payload
    }
  }
})

export const initializeUsers = () => {
  return async dispatch => {
    const allUsers = await getAllUsers()
    dispatch(setUsers(allUsers))
  }
}



export const { setUsers } = userSlice.actions
export default userSlice.reducer