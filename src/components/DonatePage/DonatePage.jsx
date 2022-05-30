import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setCardsText, setInPersonText} from "../../store/i18n"
import {setBanks, setInPerson, setPaypal} from "../../store/shared-ui-elements/donate"

import {getRequest} from "../../utils/getRequest";

import DonatePageInfo from "./DonatePageInfo";
import CardForm from "./CardForm";

const DonatePage = () => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const isEdit = useSelector(state => state.donate.isEdit);
    const isCreate = useSelector(state => state.donate.isCreate);
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
            {!isEdit && !isCreate && <DonatePageInfo/>}
            {isEdit && isLoggedIn && <CardForm toEdit/>}
            {isCreate && isLoggedIn && <CardForm toCreate/>}
        </div>
    )
}

export default DonatePage;
