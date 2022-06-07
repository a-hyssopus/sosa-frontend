import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    counter: 0,
    documentId: '',
    isEditCounter: false
}

export const sterilizationCounterSlice = createSlice({
    name: 'sterilizationCounter',
    initialState,
    reducers: {
        setSterilizationCounter: (state, {payload}) => {
            state.counter = payload;
        },
        setDocumentId: (state, {payload}) => {
            state.documentId = payload;
        },
        setIsEditCounter: (state, {payload}) => {
            state.isEditCounter = payload;
        }
    },
})

export const { setSterilizationCounter, setIsEditCounter, setDocumentId } = sterilizationCounterSlice.actions

export default sterilizationCounterSlice.reducer
