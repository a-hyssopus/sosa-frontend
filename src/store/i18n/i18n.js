import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    activeLanguage: localStorage.getItem("lang") || "en",
    navbar: [],
    heroMessage: "",
    sterilizationText: "",
    errorMessage: "",
    buttons: {
        donate: "",
        save: "",
        edit: "",
        delete: "",
        create: "",
        cancel: "",
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
    reports: {
        "cats-label": "",
        "dogs-label": "",
        "period-label": "",
        "money-label": "",
        "animals-label": "",
        "title-placeholder": "",
        "description-placeholder": "",
        "start-date": "",
        "end-date": "",
        "upload-placeholder": ""
    },
    login: {
        "username-text": "",
        "password-text": "",
        "login-text": "",
        "logout-text": "",
        "success-login-message": "",
        "fail-login-message": ""
    },
    deleteConfirm: {
        confirm: '',
        cancel: '',
        "popup-title": '',
        yes: "",
        no: ""
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
        setErrorMessage: (state, {payload}) => {
            state.errorMessage = payload;
        },
        setSterilizationText: (state, {payload}) => {
            state.sterilizationText = payload;
        },
        setDonateButton: (state, {payload}) => {
            state.buttons.donate = payload;
        },
        setSaveButton: (state, {payload}) => {
            state.buttons.save = payload;
        },
        setEditButton: (state, {payload}) => {
            state.buttons.edit = payload;
        },
        setDeleteButton: (state, {payload}) => {
            state.buttons.delete = payload;
        },
        setCancelButton: (state, {payload}) => {
            state.buttons.cancel = payload;
        },
        setSaveEntryButton: (state, {payload}) => {
            state.buttons.create = payload;
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
        setCatsLabel: (state, {payload}) => {
            state.reports["cats-label"] = payload;
        },
        setDogsLabel: (state, {payload}) => {
            state.reports["dogs-label"] = payload;
        },
        setMoneyLabel: (state, {payload}) => {
            state.reports["money-label"] = payload;
        },
        setTitlePlaceholder: (state, {payload}) => {
            state.reports["title-placeholder"] = payload;
        },
        setDescriptionPlaceholder: (state, {payload}) => {
            state.reports["description-placeholder"] = payload;
        },
        setStartDate: (state, {payload}) => {
            state.reports["start-date"] = payload;
        },
        setEndDate: (state, {payload}) => {
            state.reports["end-date"] = payload;
        },
        setUploadPlaceholder: (state, {payload}) => {
            state.reports["upload-placeholder"] = payload;
        },
        setPeriodLabel: (state, {payload}) => {
            state.reports["period-label"] = payload;
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
        setAnimalsLabel: (state, {payload}) => {
            state.reports["animals-label"] = payload;
        },
        setDeleteConfirmLabel: (state, {payload}) => {
            state.deleteConfirm.confirm = payload;
        },
        setDeleteCancelLabel: (state, {payload}) => {
            state.deleteConfirm.cancel = payload;
        },
        setDeleteTitleLabel: (state, {payload}) => {
            state.deleteConfirm["popup-title"] = payload;
        },
        setYes: (state, {payload}) => {
            state.deleteConfirm.yes = payload;
        },
        setNo: (state, {payload}) => {
            state.deleteConfirm.no = payload;
        }
    },
})

export default i18nSlice.reducer

export const {
    setActiveLanguage,
    setNavigationButtons,
    setDonateButton,
    setHeroMessage,
    setErrorMessage,
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
    setCatsLabel,
    setDogsLabel,
    setMoneyLabel,
    setAnimalsLabel,
    setPeriodLabel,
    setUsernameText,
    setPasswordText,
    setLoginText,
    setSuccessLoginMessage,
    setFailLoginMessage,
    setLogoutText,
    setDeleteCancelLabel,
    setDeleteConfirmLabel,
    setDeleteTitleLabel,
    setTitlePlaceholder,
    setDescriptionPlaceholder,
    setStartDate,
    setEndDate,
    setUploadPlaceholder,
    setYes,
    setNo
} = i18nSlice.actions
