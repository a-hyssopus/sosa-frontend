import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setCardsText, setInPersonText} from "../../store/i18n/i18n"
import {setBanks, setInPerson, setPaypal} from "../../store/sharedUIElements/donate"

import {getRequest} from "../../utils/getRequest";

import DonatePageInfo from "./DonatePageInfo";
import CardForm from "./Forms/CardForm";
import PayPalForm from "./Forms/PayPalForm";
import PersonForm from "./Forms/PersonForm";

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

    useEffect(() => {
        getRequest('http://localhost:3001/payment-details')
            .then(res => {
                dispatch(setBanks(res.banks))
                dispatch(setPaypal(res["PayPal"]))
                dispatch(setInPerson(res.inPerson))
            })
    }, [])

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setCardsText(res[activeLanguage].donate.cards))
                dispatch(setInPersonText(res[activeLanguage].donate.payInPerson))
            })
    }, [activeLanguage]);

    return (
        <div>
            {!(isEditCard || isCreateCard || isEditPaypal || isCreatePaypal || isEditPerson || isCreatePerson) && <DonatePageInfo/>}
            {isEditCard && isLoggedIn && <CardForm toEdit/>}
            {isCreateCard && isLoggedIn && <CardForm toCreate/>}
            {isEditPaypal && isLoggedIn && <PayPalForm toEdit/>}
            {isCreatePaypal && isLoggedIn && <PayPalForm toCreate/>}
            {isEditPerson && isLoggedIn && <PersonForm toEdit/>}
            {isCreatePerson && isLoggedIn && <PersonForm toCreate/>}
        </div>
    )
}

export default DonatePage;
