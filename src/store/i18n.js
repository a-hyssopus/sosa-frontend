import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    // navbar: {
    //     donate: "",
    //     home: "",
    //     blog: "",
    //     faq: "",
    //     about: ""
    // },
    navbar: [],
    heroMessage: "",
    sterilizationText: "",
}

export const i18nSlice = createSlice({
    name: 'i18n',
    initialState,
    reducers: {
        setNavigationButtons: (state, action) => {
            console.log(action)
            state.navbar = action.payload;
        },
        setHeroMessage: (state, action) => {
            state.heroMessage = action.payload;
        },
        setSterilizationText: (state, action) => {
            state.sterilizationText = action.payload;
        }
    },
})

export const { setNavigationButtons, setHeroMessage, setSterilizationText } = i18nSlice.actions

export default i18nSlice.reducer
