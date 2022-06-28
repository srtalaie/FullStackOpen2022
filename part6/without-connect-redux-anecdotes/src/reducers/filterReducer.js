import { createSlice } from "@reduxjs/toolkit"

const initialState = ''

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filterSearch: (state, action) => {
            const filterTerm = action.payload
            state = filterTerm
            return state
        }
    }
})

export const { filterSearch } = filterSlice.actions
export default filterSlice.reducer