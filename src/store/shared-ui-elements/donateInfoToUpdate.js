import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    card: {
        bankName: '',
        primaryColor: '',
        secondaryColor: '',
        textColor: '',
        link: '',
        count: '',
        person: '',
        currency: '',
        id: ''
    }, paypal: {
        email: '', country: '', id: ''
    }, person: {
        name: '', number: '', id: ''
    }
}

export const donateInfoToUpdateSlice = createSlice({
    name: 'donateInfoToUpdate', initialState, reducers: {
        setBankName: (state, {payload}) => {
            state.card.bankName = payload;
        }, setPrimaryColor: (state, {payload}) => {
            state.card.primaryColor = payload;
        }, setSecondaryColor: (state, {payload}) => {
            state.card.secondaryColor = payload;
        }, setTextColor: (state, {payload}) => {
            state.card.textColor = payload;
        }, setLink: (state, {payload}) => {
            state.card.link = payload;
        }, setCount: (state, {payload}) => {
            state.card.count = payload;
        }, setPerson: (state, {payload}) => {
            state.card.person = payload;
        }, setCurrency: (state, {payload}) => {
            state.card.currency = payload;
        }, setId: (state, {payload}) => {
            state.card.id = payload;
        }, setEmptyCardInfo: (state) => {
            state.card.name = '';
            state.card.primaryColor = '';
            state.card.secondaryColor = '';
            state.card.textColor = '';
            state.card.link = '';
            state.card.count = '';
            state.card.person = '';
            state.card.currency = '';
            state.card.id = '';
        }, setEmail: (state, {payload}) => {
            state.paypal.email = payload
        }, setCountry: (state, {payload}) => {
            state.paypal.country = payload
        }, setPaypalId: (state, {payload}) => {
            state.paypal.id = payload;
        }, setEmptyPaypalInfo: (state) => {
            state.paypal.email = '';
            state.paypal.country = '';
            state.paypal.id = '';
        }, setPersonName: (state, {payload}) => {
            state.person.name = payload;
        }, setPersonNumber: (state, {payload}) => {
            state.person.number = payload;
        }, setPersonId: (state, {payload}) => {
            state.person.id = payload;
        }, setEmptyPersonInfo: (state) => {
            state.person.name = '';
            state.person.number = '';
            state.person.id = '';
        }
    },
})

export const {
    setBankName,
    setPrimaryColor,
    setSecondaryColor,
    setTextColor,
    setLink,
    setCount,
    setPerson,
    setCurrency,
    setId,
    setEmptyCardInfo,
    setEmail,
    setCountry,
    setPaypalId,
    setEmptyPaypalInfo,
    setPersonName,
    setPersonNumber,
    setPersonId,
    setEmptyPersonInfo
} = donateInfoToUpdateSlice.actions;

export default donateInfoToUpdateSlice.reducer
