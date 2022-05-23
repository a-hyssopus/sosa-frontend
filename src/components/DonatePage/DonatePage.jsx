import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {setCardsText, setInPersonText, setPaypalMDText, setPaypalUSText} from "../../store/i18n"
import {setCurrency, setMAIB, setMICB, setInPerson, setPaypalEmails} from "../../store/shared-ui-elements/donate"
import {getRequest} from "../../utils/getRequest";


const DonatePage = () => {
    const dispatch = useDispatch();
    const cardsText = useSelector(state => state.i18n.cardsText);
    const paypalUSText = useSelector(state => state.i18n.paypalUSText);
    const paypalMDText = useSelector(state => state.i18n.paypalMDText);
    const inPersonText = useSelector(state => state.i18n.inPersonText);
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const currency = useSelector(state => state.donate.currency);
    const MAIB = useSelector(state => state.donate.MAIB);
    const MICB = useSelector(state => state.donate.MICB);
    const paypalEmails = useSelector(state => state.donate.paypalEmails);
    const inPerson = useSelector(state => state.donate.inPerson);

    useEffect(() => {
        getRequest('http://localhost:3001/shared-ui-elements')
            .then(res => {
                dispatch(setCurrency(res.donate.currency))
                dispatch(setMAIB(res.donate.MAIB))
                dispatch(setMICB(res.donate.MICB))
                dispatch(setPaypalEmails(res.donate.paypalEmails))
                dispatch(setInPerson(res.donate.inPerson))
            })
    }, [])

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setCardsText(res[activeLanguage].donate.cards))
                dispatch(setPaypalUSText(res[activeLanguage].donate.paypal.PaypalUS))
                dispatch(setPaypalMDText(res[activeLanguage].donate.paypal.PaypalMD))
                dispatch(setInPersonText(res[activeLanguage].donate.payInPerson))
            })
    }, [activeLanguage]);

    return (
        <div>
            {cardsText}
            {paypalUSText}
            {paypalEmails.US}
            {paypalMDText}
            {paypalEmails.MD}

            {currency}
            {MAIB.map(el => <p key={el.count}>{el.count}, {el.person}</p>)}
            {MICB.map(el => <p key={el.count}>{el.count}, {el.person}</p>)}
            {inPersonText}
            {inPerson.map(el => <p key={el["mobile-number"]}>{el.person}, {el["mobile-number"]}</p>)}
        </div>
    )
}

export default DonatePage;
