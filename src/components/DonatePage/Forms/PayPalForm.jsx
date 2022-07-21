import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRequest} from "../../../utils/getRequest";

import {setPaypalCountryLabel, setPaypalEmailLabel} from "../../../store/i18n/i18n";
import {setCountry, setEmail, setEmptyPaypalInfo} from "../../../store/sharedUIElements/donateInfoToUpdate";
import {setCreatePaypal, setEditPaypal, setPaypal} from "../../../store/sharedUIElements/donate";
import {postRequest} from "../../../utils/postRequest";
import {Button, Input} from "antd";

const PayPalForm = ({toEdit, toCreate}) => {
    const dispatch = useDispatch();

    const email = useSelector(state => state.donateInfoToUpdate.paypal.email);
    const country = useSelector(state => state.donateInfoToUpdate.paypal.country);
    const id = useSelector(state => state.donateInfoToUpdate.paypal.id);

    const emailLabel = useSelector(state => state.i18n.donate.paypalFormLabels["email-label"])
    const countryLabel = useSelector(state => state.i18n.donate.paypalFormLabels["country-label"])

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const create = useSelector(state => state.i18n.buttons.save);
    const cancel = useSelector(state => state.i18n.buttons.cancel);

    const handleSaveEditButton = () => {
        const data = {email, country};

        postRequest(`${process.env.REACT_APP_BACKEND_URL}/payment-details/paypal/${id}`, JSON.stringify(data), 'PATCH')
            .then(() => getRequest(process.env.REACT_APP_BACKEND_URL + '/payment-details'))
            .then(res => {
                dispatch(setEditPaypal(false))
                dispatch(setPaypal(res.PayPal))
                dispatch(setEmptyPaypalInfo())
            })
    }

    const handleSaveCreateButton = () => {
        const data = {email, country};

        postRequest(`${process.env.REACT_APP_BACKEND_URL}/payment-details/paypal`, JSON.stringify(data), 'POST')
            .then(() => getRequest(process.env.REACT_APP_BACKEND_URL + '/payment-details'))
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
        <div className="donate-page--paypal-form">
            <div className="donate-page--paypal-form--form">
                <div className="label-input-container">
                    <label>{emailLabel}</label>
                    <Input type="email" value={email} onChange={event => dispatch(setEmail(event.target.value))}
                           autoFocus/>
                </div>
                <div className="label-input-container">
                    <label>{countryLabel}</label>
                    <Input type="text" value={country} onChange={event => dispatch(setCountry(event.target.value))}/>
                </div>
            </div>
            <div className="donate-page--buttons-container">
                <Button onClick={handleCancelButton}>{cancel}</Button>
                <Button type="primary"
                        onClick={toEdit ? handleSaveEditButton : handleSaveCreateButton}>{create}</Button>
            </div>
        </div>
    )
}

export default PayPalForm;
