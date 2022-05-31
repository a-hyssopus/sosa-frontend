import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    activeLanguage: localStorage.getItem("lang") || "en",
    navbar: [],
    heroMessage: "",
    sterilizationText: "",
    buttons: {
        donateButton: "",
        saveButton: "",
        editButton: "",
        deleteButton: "",
        saveEntryButton: "",
        cancelButton: "",
    },
    donate: {
        cardsText: "",
        inPersonText: "",
        cardFormLabels: {
            "bank-name": "",
            "primary-color": "",
            "secondary-color": "",
            "text-color": "",
            "link": "",
            "card-number": "",
            "card-holder": "",
            "card-currency": "",
        },
        cardFormInfo: {
            "attention-text": ""
        },
        paypalFormLabels: {
            "email-label": "",
            "country-label": ""
        },
        personFormLabels: {
            "person-label": "",
            "number-label": ""
        }
    },
    login: {
        "username-text": "",
        "password-text": "",
        "login-text": "",
        "logout-text": "",
        "success-login-message": "",
        "fail-login-message": ""
    }
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
        setHeroMessage: (state, {payload}) => {
            state.heroMessage = payload;
        },
        setSterilizationText: (state, {payload}) => {
            state.sterilizationText = payload;
        },
        setDonateButton: (state, {payload}) => {
            state.buttons.donateButton = payload;
        },
        setSaveButton: (state, {payload}) => {
            state.buttons.saveButton = payload;
        },
        setEditButton: (state, {payload}) => {
            state.buttons.editButton = payload;
        },
        setDeleteButton: (state, {payload}) => {
            state.buttons.deleteButton = payload;
        },
        setCancelButton: (state, {payload}) => {
            state.buttons.cancelButton = payload;
        },
        setSaveEntryButton: (state, {payload}) => {
            state.buttons.saveEntryButton = payload;
        },
        setCardsText: (state, {payload}) => {
            state.donate.cardsText = payload;
        },
        setInPersonText: (state, {payload}) => {
            state.donate.inPersonText = payload;
        },
        setBankNamei18n: (state, {payload}) => {
            state.donate.cardFormLabels["bank-name"] = payload
        },
        setPrimaryColori18n: (state, {payload}) => {
            state.donate.cardFormLabels["primary-color"] = payload
        },
        setSecondaryColori18n: (state, {payload}) => {
            state.donate.cardFormLabels["secondary-color"] = payload
        },
        setTextColori18n: (state, {payload}) => {
            state.donate.cardFormLabels["text-color"] = payload
        },
        setLinki18n: (state, {payload}) => {
            state.donate.cardFormLabels.link = payload
        },
        setCardNumber: (state, {payload}) => {
            state.donate.cardFormLabels["card-number"] = payload;
        },
        setCardHolder: (state, {payload}) => {
            state.donate.cardFormLabels["card-holder"] = payload;
        },
        setCardCurrency: (state, {payload}) => {
            state.donate.cardFormLabels["card-currency"] = payload;
        },
        setAttentionText: (state, {payload}) => {
            state.donate.cardFormInfo["attention-text"] = payload;
        },
        setPaypalEmailLabel: (state, {payload}) => {
            state.donate.paypalFormLabels["email-label"] = payload;
        },
        setPaypalCountryLabel: (state, {payload}) => {
            state.donate.paypalFormLabels["country-label"] = payload;
        },
        setPersonNameLabel: (state, {payload}) => {
            state.donate.personFormLabels["person-label"] = payload;
        },
        setPersonNumberLabel: (state, {payload}) => {
            state.donate.personFormLabels["number-label"] = payload;
        },
        setUsernameText: (state, {payload}) => {
            state.login["username-text"] = payload;
        },
        setPasswordText: (state, {payload}) => {
            state.login["password-text"] = payload;
        },
        setLoginText: (state, {payload}) => {
            state.login["login-text"] = payload;
        },
        setSuccessLoginMessage: (state, {payload}) => {
            state.login["success-login-message"] = payload;
        },
        setFailLoginMessage: (state, {payload}) => {
            state.login["fail-login-message"] = payload;
        },
        setLogoutText: (state, {payload}) => {
            state.login["logout-text"] = payload;
        },

    },
})

export default i18nSlice.reducer

export const {
    setActiveLanguage,
    setNavigationButtons,
    setDonateButton,
    setHeroMessage,
    setSterilizationText,
    setSaveButton,
    setEditButton,
    setCancelButton,
    setDeleteButton,
    setSaveEntryButton,
    setCardsText,
    setInPersonText,
    setBankNamei18n,
    setPrimaryColori18n,
    setSecondaryColori18n,
    setTextColori18n,
    setLinki18n,
    setCardHolder,
    setCardNumber,
    setCardCurrency,
    setAttentionText,
    setPaypalCountryLabel,
    setPaypalEmailLabel,
    setPersonNameLabel,
    setPersonNumberLabel,
    setUsernameText,
    setPasswordText,
    setLoginText,
    setSuccessLoginMessage,
    setFailLoginMessage,
    setLogoutText
} = i18nSlice.actions
