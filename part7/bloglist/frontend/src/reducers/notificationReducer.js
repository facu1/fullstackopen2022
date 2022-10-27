import { createSlice } from '@reduxjs/toolkit'

let timeoutID = null

const notificationSlice = createSlice({
  initialState: '',
  name: 'notification',
  reducers: {
    notificationChange(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return ''
    }
  }
})

export const { notificationChange, resetNotification } =
  notificationSlice.actions

export const setNotification = (msg, delayInSeconds) => {
  return (dispatch) => {
    if (timeoutID) clearTimeout(timeoutID)

    dispatch(notificationChange(msg))

    timeoutID = setTimeout(() => {
      dispatch(resetNotification())
    }, delayInSeconds * 1000)
  }
}

export default notificationSlice.reducer
