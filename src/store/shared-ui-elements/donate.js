import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    banks: [],
    PayPal: [],
    inPerson: [],
    isEdit: false,
    isCreate: false,
}

export const donateSlice = createSlice({
    name: 'donate',
    initialState,
    reducers: {
        setBanks: (state, {payload}) => {
            state.banks = payload;
        },
        setInPerson: (state, {payload}) => {
            state.inPerson = payload;
        },
        setPaypal: (state, {payload}) => {
            state.PayPal = payload;
        },
        setEdit: (state, {payload}) => {
            state.isEdit = payload;
        },
        setCreate: (state, {payload}) => {
            state.isCreate = payload;
        },
    },
})

export const {
    setBanks,
    setInPerson,
    setPaypal,
    setEdit,
    setCreate,
} = donateSlice.actions

export default donateSlice.reducer
