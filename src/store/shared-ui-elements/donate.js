import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currency: "",
    "MAIB": [],
    "MICB": [],
    "inPerson": [],
    "paypalEmails": {}
}

export const donateSlice = createSlice({
    name: 'donate',
    initialState,
    reducers: {
        setCurrency(state, action) {
            state.currency = action.payload;
        },
        setMAIB(state, action) {
            state.MAIB = action.payload;
        },
        setMICB(state, action) {
            state.MICB = action.payload;
        },
        setInPerson(state, action) {
            state.inPerson = action.payload;
        },
        setPaypalEmails(state, action) {
            state.paypalEmails = action.payload;
        }
    },
})

export const { setCurrency, setMAIB, setMICB, setInPerson, setPaypalEmails } = donateSlice.actions

export default donateSlice.reducer
