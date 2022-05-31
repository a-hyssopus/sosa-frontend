import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRequest} from "../../../utils/getRequest";

import {setPaypalCountryLabel, setPaypalEmailLabel} from "../../../store/i18n";
import {
    setCountry,
    setEmail,
    setEmptyPaypalInfo
} from "../../../store/shared-ui-elements/donateInfoToUpdate";
import {setCreatePaypal, setEditPaypal, setPaypal} from "../../../store/shared-ui-elements/donate";
import {postRequest} from "../../../utils/postRequest";

const PayPalForm = ({toEdit, toCreate}) => {
    const dispatch = useDispatch();

    const email = useSelector(state => state.donateInfoToUpdate.paypal.email);
    const country = useSelector(state => state.donateInfoToUpdate.paypal.country);
    const id = useSelector(state => state.donateInfoToUpdate.paypal.id);

    const emailLabel = useSelector(state => state.i18n.donate.paypalFormLabels["email-label"])
    const countryLabel = useSelector(state => state.i18n.donate.paypalFormLabels["country-label"])

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const saveEntryButton = useSelector(state => state.i18n.buttons.saveButton);
    const cancelButton = useSelector(state => state.i18n.buttons.cancelButton);

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setPaypalEmailLabel(res[activeLanguage].donate["paypal-form-labels"]["email-label"]))
                dispatch(setPaypalCountryLabel(res[activeLanguage].donate["paypal-form-labels"]["country-label"]))
            })
    }, [activeLanguage])

    const handleSaveEditButton = () => {
        const data = {email, country};

        postRequest(`http://localhost:3001/payment-details/paypal/${id}`, JSON.stringify(data), 'PATCH')
            .then(() => getRequest('http://localhost:3001/payment-details'))
            .then(res => {
                dispatch(setEditPaypal(false))
                dispatch(setPaypal(res.PayPal))
                dispatch(setEmptyPaypalInfo())
            })
    }

    const handleSaveCreateButton = () => {
        const data = {email, country};

        postRequest(`http://localhost:3001/payment-details/paypal`, JSON.stringify(data), 'POST')
            .then(() => getRequest('http://localhost:3001/payment-details'))
            .then(res => {
                dispatch(setPaypal(res.PayPal))
                dispatch(setCreatePaypal(false))
                dispatch(setEmptyPaypalInfo())
            })
    }

    const handleCancelButton = () => {
        dispatch(setEditPaypal(false))
        dispatch(setCreatePaypal(false))
        dispatch(setEmptyPaypalInfo())
    }

    return (
        <div>
            <label>{emailLabel}</label>
            <input type="text" value={email} onChange={event => dispatch(setEmail(event.target.value))} autoFocus/>
            <label>{countryLabel}</label>
            <input type="text" value={country} onChange={event => dispatch(setCountry(event.target.value))}/>
            {toEdit && <button onClick={handleSaveEditButton}>{saveEntryButton}</button>}
            {toCreate && <button onClick={handleSaveCreateButton}>{saveEntryButton}</button>}
            <button onClick={handleCancelButton}>{cancelButton}</button>
        </div>
    )
}

export default PayPalForm;
