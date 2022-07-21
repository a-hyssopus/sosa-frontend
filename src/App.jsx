import React, {useEffect} from "react"
import "antd/dist/antd.css";

import './App.scss'
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navbar";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import OurStories from "./components/OurStories/OurStories";
import Story from "./components/OurStories/Story";
import DonatePage from "./components/DonatePage/DonatePage";
import LoginPage from "./components/LoginPage/LoginPage";
import Reports from "./components/Reports/Reports";
import Report from "./components/Reports/Report";
import AboutUs from "./components/AboutUs/AboutUs";
import FAQ from "./components/FAQ/FAQ";
import Page404 from "./components/Page404/Page404";

import {getRequest} from "./utils/getRequest";
import {
    setAnimalsLabel,
    setAttentionText,
    setBankNamei18n, setCancelButton,
    setCardCurrency,
    setCardHolder,
    setCardNumber,
    setCardsText,
    setCatsLabel, setDeleteButton,
    setDeleteCancelLabel,
    setDeleteConfirmLabel,
    setDeleteTitleLabel,
    setDogsLabel, setDonateButton, setEditButton, setErrorMessage, setFailLoginMessage,
    setHeroMessage,
    setInPersonText,
    setLinki18n,
    setLoginText,
    setLogoutText, setMoneyLabel, setNavigationButtons,
    setPasswordText,
    setPaypalCountryLabel,
    setPaypalEmailLabel,
    setPeriodLabel,
    setPersonNameLabel,
    setPersonNumberLabel,
    setPrimaryColori18n, setSaveButton, setSaveEntryButton,
    setSecondaryColori18n, setSterilizationText, setSuccessLoginMessage,
    setTextColori18n,
    setUsernameText,
    setTitlePlaceholder,
    setDescriptionPlaceholder,
    setStartDate,
    setEndDate,
    setUploadPlaceholder,
    setNo,
    setYes
} from "./store/i18n/i18n";
import {useDispatch, useSelector} from "react-redux";

const App = () => {
    const dispatch = useDispatch();
    const activeLanguage = useSelector((state) => state.i18n.activeLanguage)

    useEffect(() => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setCatsLabel(res[activeLanguage].reports["cats-label"]))
                dispatch(setDogsLabel(res[activeLanguage].reports["dogs-label"]))
                dispatch(setPeriodLabel(res[activeLanguage].reports["period-label"]))
                dispatch(setMoneyLabel(res[activeLanguage].reports["money-label"]))
                dispatch(setAnimalsLabel(res[activeLanguage].reports["animals-label"]))
                dispatch(setNavigationButtons(res[activeLanguage].navbar))
                dispatch(setDonateButton(res[activeLanguage]["donate-button"]))
                dispatch(setSaveButton(res[activeLanguage]["save-button"]))
                dispatch(setEditButton(res[activeLanguage]["edit-button"]))
                dispatch(setCancelButton(res[activeLanguage]["cancel-button"]))
                dispatch(setDeleteButton(res[activeLanguage]["delete-button"]))
                dispatch(setSaveEntryButton(res[activeLanguage]["add-post-button"]))
                dispatch(setSterilizationText(res[activeLanguage]["sterilization-text"]))
                dispatch(setErrorMessage(res[activeLanguage]["error-message"]))
                dispatch(setSterilizationText(res[activeLanguage]["sterilization-text"]))
                dispatch(setUsernameText(res[activeLanguage].login["username-text"]))
                dispatch(setPasswordText(res[activeLanguage].login["password-text"]))
                dispatch(setLoginText(res[activeLanguage].login["login-text"]))
                dispatch(setLogoutText(res[activeLanguage].login["logout-text"]))
                dispatch(setSuccessLoginMessage(res[activeLanguage].login["success-login-message"]))
                dispatch(setFailLoginMessage(res[activeLanguage].login["fail-login-message"]))
                dispatch(setPaypalEmailLabel(res[activeLanguage].donate["paypal-form-labels"]["email-label"]))
                dispatch(setPaypalCountryLabel(res[activeLanguage].donate["paypal-form-labels"]["country-label"]))
                dispatch(setBankNamei18n(res[activeLanguage].donate["card-form-labels"]["bank-name"]))
                dispatch(setPrimaryColori18n(res[activeLanguage].donate["card-form-labels"]["primary-color"]))
                dispatch(setSecondaryColori18n(res[activeLanguage].donate["card-form-labels"]["secondary-color"]))
                dispatch(setTextColori18n(res[activeLanguage].donate["card-form-labels"]["text-color"]))
                dispatch(setLinki18n(res[activeLanguage].donate["card-form-labels"].link))
                dispatch(setCardHolder(res[activeLanguage].donate["card-form-labels"]["card-holder"]))
                dispatch(setCardNumber(res[activeLanguage].donate["card-form-labels"]["card-number"]))
                dispatch(setCardCurrency(res[activeLanguage].donate["card-form-labels"]["card-currency"]))
                dispatch(setAttentionText(res[activeLanguage].donate["card-form-info"]["attention-text"]))
                dispatch(setHeroMessage(res[activeLanguage]["hero-message"]))
                dispatch(setPersonNameLabel(res[activeLanguage].donate["person-form-labels"]["person-label"]))
                dispatch(setPersonNumberLabel(res[activeLanguage].donate["person-form-labels"]["number-label"]))
                dispatch(setCardsText(res[activeLanguage].donate.cards))
                dispatch(setInPersonText(res[activeLanguage].donate.payInPerson))
                dispatch(setDeleteCancelLabel(res[activeLanguage]["delete-confirm"].cancel));
                dispatch(setDeleteConfirmLabel(res[activeLanguage]["delete-confirm"].confirm));
                dispatch(setYes(res[activeLanguage]["delete-confirm"].yes));
                dispatch(setNo(res[activeLanguage]["delete-confirm"].no));
                dispatch(setDeleteTitleLabel(res[activeLanguage]["delete-confirm"]["popup-title"]));
                dispatch(setHeroMessage(res[activeLanguage]["hero-message"]))
                dispatch(setCatsLabel(res[activeLanguage].reports["cats-label"]))
                dispatch(setDogsLabel(res[activeLanguage].reports["dogs-label"]))
                dispatch(setPeriodLabel(res[activeLanguage].reports["period-label"]))
                dispatch(setAnimalsLabel(res[activeLanguage].reports["animals-label"]))
                dispatch(setMoneyLabel(res[activeLanguage].reports["money-label"]))
                dispatch(setTitlePlaceholder(res[activeLanguage].reports["title-placeholder"]))
                dispatch(setDescriptionPlaceholder(res[activeLanguage].reports["description-placeholder"]))
                dispatch(setStartDate(res[activeLanguage].reports["start-date"]))
                dispatch(setEndDate(res[activeLanguage].reports["end-date"]))
                dispatch(setUploadPlaceholder(res[activeLanguage].reports["upload"]))
            });
    }, [activeLanguage])

    return (<div className='App'>
            <Header/>
            <Navbar/>
            <Routes>
                <Route exact path={"/donate"} element={<DonatePage/>}/>
                <Route exact path={"/our-stories"} element={<OurStories/>}/>
                <Route exact path={"/our-stories/:id"} element={<Story/>}/>
                <Route exact path={"/about"} element={<AboutUs/>}/>
                <Route exact path={"/faq"} element={<FAQ/>}/>
                <Route exact path={"/reports"} element={<Reports/>}/>
                <Route exact path={"/reports/:id"} element={<Report/>}/>
                <Route exact path={"/login"} element={<LoginPage/>}/>
                <Route exact path={"/home"} element={<MainPage/>}/>
                <Route exact path={"/"} element={<Navigate replace to="/home"/>}/>
                <Route path="*" element={<Page404/>}/>
            </Routes>
            <div className="link">
                <Link to={"/login"}>Log In</Link>
            </div>
            /*TODO change i18n for login*/
        </div>
    )
}

export default App;
