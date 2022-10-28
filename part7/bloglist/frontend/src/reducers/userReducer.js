import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/user'

const userSlice = createSlice({
  initialState: null,
  name: 'user',
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    resetUser(state, action) {
      return null
    }
  }
})

export const { setUser, resetUser } = userSlice.actions

export const initializeUser = () => {
  return (dispatch) => {
    const user = userService.getUser()
    dispatch(setUser(user))
  }
}

export const defineUser = (user) => {
  return (dispatch) => {
    userService.setUser(user)
    dispatch(setUser(user))
  }
}

export const removeUser = () => {
  return (dispatch) => {
    userService.clearUser()
    dispatch(resetUser())
  }
}

export default userSlice.reducer
