import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setCardsText, setInPersonText} from "../../store/i18n/i18n";
import {setBanks, setInPerson, setPaypal} from "../../store/sharedUIElements/donate"

import {getRequest} from "../../utils/getRequest";

import DonatePageInfo from "./DonatePageInfo";
import CardForm from "./Forms/CardForm";
import PayPalForm from "./Forms/PayPalForm";
import PersonForm from "./Forms/PersonForm";
import ErrorWrapper from "../SharedElements/ErrorWrapper";
import {errorHandler} from "../../utils/errorHandler";


const DonatePage = () => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    const isEditCard = useSelector(state => state.donate.isEditCard);
    const isCreateCard = useSelector(state => state.donate.isCreateCard);
    const isEditPaypal = useSelector(state => state.donate.isEditPaypal)
    const isCreatePaypal = useSelector(state => state.donate.isCreatePaypal)
    const isEditPerson = useSelector(state => state.donate.isEditPerson)
    const isCreatePerson = useSelector(state => state.donate.isCreatePerson)

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const [error, setError] = useState(false);

    useEffect(() => {
        getRequest(process.env.REACT_APP_BACKEND_URL + '/payment-details')
            .then(res => {
                errorHandler(res, [dispatch(setBanks(res.banks)),
                    dispatch(setPaypal(res["PayPal"])),
                    dispatch(setInPerson(res.inPerson))])
                // if (res) {
                //     dispatch(setBanks(res.banks))
                //     dispatch(setPaypal(res["PayPal"]))
                //     dispatch(setInPerson(res.inPerson))
                // } else {
                //     const err = new Error("Something went wrong!");
                //     err.response = res;
                //     throw err;
                // }
            })
            .catch(() => setError(true))
    }, [error])

    useEffect(() => {
        getRequest(`process.env.REACT_APP_BACKEND_URL/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setCardsText(res[activeLanguage].donate.cards))
                dispatch(setInPersonText(res[activeLanguage].donate.payInPerson))
            })
    }, [activeLanguage]);

    return (
        <>
            {error && <ErrorWrapper/>}
            {!error && !(isEditCard || isCreateCard || isEditPaypal || isCreatePaypal || isEditPerson || isCreatePerson) && <DonatePageInfo/>}
            {isEditCard && isLoggedIn && <CardForm toEdit/>}
            {isCreateCard && isLoggedIn && <CardForm toCreate/>}
            {isEditPaypal && isLoggedIn && <PayPalForm toEdit/>}
            {isCreatePaypal && isLoggedIn && <PayPalForm toCreate/>}
            {isEditPerson && isLoggedIn && <PersonForm toEdit/>}
            {isCreatePerson && isLoggedIn && <PersonForm toCreate/>}
        </>
    )
}

export default DonatePage;
