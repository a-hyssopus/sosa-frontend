import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    counter: 0,
}

export const sterilizationCounterSlice = createSlice({
    name: 'sterilizationCounter',
    initialState,
    reducers: {
        setSterilizationCounter(state, action) {
            state.counter = action.payload;
        },
        addAmountToSterilizationCounter(state, action) {
            state.counter = action.payload;
        }
    },
})

export const { setSterilizationCounter, addAmountToSterilizationCounter } = sterilizationCounterSlice.actions

export default sterilizationCounterSlice.reducer
