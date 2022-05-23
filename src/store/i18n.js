import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    activeLanguage: localStorage.getItem("lang") || "en",
    navbar: [],
    heroMessage: "",
    sterilizationText: "",
    donateButton: "",
    saveButton: "",
    editButton: "",
    deleteButton: "",
    addPostButton: "",
    cardsText: "",
    paypalUSText: "",
    paypalMDText: "",
    inPersonText: "",
}

export const i18nSlice = createSlice({
    name: 'i18n',
    initialState,
    reducers: {
        setActiveLanguage: (state, {payload}) => {
            state.activeLanguage = payload;
        },
        setNavigationButtons: (state, {payload}) => {
            state.navbar = payload;
        },
        setDonateButton: (state, {payload}) => {
            state.donateButton = payload;
        },
        setHeroMessage: (state, {payload}) => {
            state.heroMessage = payload;
        },
        setSterilizationText: (state, {payload}) => {
            state.sterilizationText = payload;
        },
        setSaveButton: (state, {payload}) => {
            state.saveButton = payload;
        },
        setEditButton: (state, {payload}) => {
            state.editButton = payload;
        },
        setDeleteButton: (state, {payload}) => {
            state.deleteButton = payload;
        },
        setAddPostButton: (state, {payload}) => {
            state.addPostButton = payload;
        },
        setCardsText: (state, {payload}) => {
            state.cardsText = payload;
        },
        setPaypalUSText: (state, {payload}) => {
            state.paypalUSText = payload;
        },
        setPaypalMDText: (state, {payload}) => {
            state.paypalMDText = payload;
        },
        setInPersonText: (state, {payload}) => {
            state.inPersonText = payload;
        }
    },
})

export const {
    setActiveLanguage,
    setNavigationButtons,
    setDonateButton,
    setHeroMessage,
    setSterilizationText,
    setSaveButton,
    setEditButton,
    setDeleteButton,
    setAddPostButton,
    setCardsText,
    setPaypalUSText,
    setPaypalMDText,
    setInPersonText
} = i18nSlice.actions

export default i18nSlice.reducer
