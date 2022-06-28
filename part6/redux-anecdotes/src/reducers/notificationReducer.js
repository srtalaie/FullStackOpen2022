import { createSlice } from "@reduxjs/toolkit"

const initialState = ''
let timeoutID

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotif: (state, action) => {
            const message = action.payload
            state = message
            return state
        },
        removeNotif: (state) => {
            state = ''
            return state
        }
    }
})

export const setNotification = (message, time) => {
    return dispatch => {
        clearTimeout(timeoutID)
        dispatch(createNotif(message))
        timeoutID = setTimeout(() => {
            dispatch(removeNotif())
          }, time)
    }
}

export const { createNotif, removeNotif } = notificationSlice.actions
export default notificationSlice.reducer