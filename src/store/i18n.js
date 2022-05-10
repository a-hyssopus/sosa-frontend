import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeLanguage: localStorage.getItem("lang") || "en",
    navbar: [],
    heroMessage: "",
    sterilizationText: "",
    donateButton: "",
}

export const i18nSlice = createSlice({
    name: 'i18n',
    initialState,
    reducers: {
        setActiveLanguage: (state, action) => {
            state.activeLanguage = action.payload;
        },
        setNavigationButtons: (state, action) => {
            state.navbar = action.payload;
        },
        setDonateButton: (state, action) => {
            state.donateButton = action.payload;
        },
        setHeroMessage: (state, action) => {
            state.heroMessage = action.payload;
        },
        setSterilizationText: (state, action) => {
            state.sterilizationText = action.payload;
        }
    },
})

export const { setActiveLanguage, setNavigationButtons, setDonateButton, setHeroMessage, setSterilizationText } = i18nSlice.actions

export default i18nSlice.reducer
