import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    banks: [],
    PayPal: [],
    inPerson: [],
    isEditCard: false,
    isCreateCard: false,
    isEditPaypal: false,
    isCreatePaypal: false,
    isEditPerson: false,
    isCreatePerson: false
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
        setEditCard: (state, {payload}) => {
            state.isEditCard = payload;
        },
        setCreateCard: (state, {payload}) => {
            state.isCreateCard = payload;
        },
        setEditPaypal: (state, {payload}) => {
            state.isEditPaypal = payload;
        },
        setCreatePaypal: (state, {payload}) => {
            state.isCreatePaypal = payload;
        },
        setEditPerson: (state, {payload}) => {
            state.isEditPerson = payload;
        },
        setCreatePerson: (state, {payload}) => {
            state.isCreatePerson = payload;
        },
    },
})

export const {
    setBanks,
    setInPerson,
    setPaypal,
    setEditCard,
    setCreateCard,
    setEditPaypal,
    setCreatePaypal,
    setEditPerson,
    setCreatePerson
} = donateSlice.actions

export default donateSlice.reducer
