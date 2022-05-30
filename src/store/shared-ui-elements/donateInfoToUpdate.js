import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    name: '',
    primaryColor: '',
    secondaryColor: '',
    textColor: '',
    link: '',
    count: '',
    person: '',
    currency: '',
    id: ''
}

export const donateInfoToUpdateSlice = createSlice({
    name: 'donateInfoToUpdate',
    initialState,
    reducers: {
        setName: (state, {payload}) => {
            state.name = payload;
        },
        setPrimaryColor: (state, {payload}) => {
            state.primaryColor = payload;
        },
        setSecondaryColor: (state, {payload}) => {
            state.secondaryColor = payload;
        },
        setTextColor: (state, {payload}) => {
            state.textColor = payload;
        },
        setLink: (state, {payload}) => {
            state.link = payload;
        },
        setCount: (state, {payload}) => {
            state.count = payload;
        },
        setPerson: (state, {payload}) => {
            state.person = payload;
        },
        setCurrency: (state, {payload}) => {
            state.currency = payload;
        },
        setId: (state, {payload}) => {
            state.id = payload;
        },
        setEmptyInfo: (state) => {
            state.name = '';
            state.primaryColor = '';
            state.secondaryColor = '';
            state.textColor = '';
            state.link = '';
            state.count = '';
            state.person = '';
            state.currency = '';
            state.id = '';
        }
    },
})

export const {
    setName,
    setPrimaryColor,
    setSecondaryColor,
    setTextColor,
    setLink,
    setCount,
    setPerson,
    setCurrency,
    setId,
    setEmptyInfo
} = donateInfoToUpdateSlice.actions;

export default donateInfoToUpdateSlice.reducer
