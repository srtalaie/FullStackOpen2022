import { useSelector } from 'react-redux'
import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        createNotif: (state, action) => {
            const message = action.payload
            state = message
        }
    }
})

export const { createNotif } = notificationSlice.actions
export default notificationSlice.reducer