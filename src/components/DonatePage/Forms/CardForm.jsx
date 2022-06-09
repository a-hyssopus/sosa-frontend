import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    setBankName,
    setCount,
    setCurrency,
    setEmptyCardInfo,
    setLink,
    setPerson, setPrimaryColor, setSecondaryColor, setTextColor,
} from "../../../store/sharedUIElements/donateInfoToUpdate";

import {
    setAttentionText,
    setBankNamei18n,
    setCardCurrency,
    setCardHolder,
    setCardNumber,
    setLinki18n,
    setPrimaryColori18n,
    setSecondaryColori18n,
    setTextColori18n
} from "../../../store/i18n/i18n"

import {setBanks, setCreateCard, setEditCard} from "../../../store/sharedUIElements/donate";

import {getRequest} from "../../../utils/getRequest";
import {postRequest} from "../../../utils/postRequest";

import "./style.scss"
import {Button, Input} from "antd";
import ColorPicker from "./ColorPicker";

const CardForm = ({ toEdit }) => {
    const dispatch = useDispatch();

    const bankName = useSelector(state => state.donateInfoToUpdate.card.bankName);
    const primaryColor = useSelector(state => state.donateInfoToUpdate.card.primaryColor);
    const secondaryColor = useSelector(state => state.donateInfoToUpdate.card.secondaryColor);
    const textColor = useSelector(state => state.donateInfoToUpdate.card.textColor);
    const link = useSelector(state => state.donateInfoToUpdate.card.link);
    const count = useSelector(state => state.donateInfoToUpdate.card.count);
    const person = useSelector(state => state.donateInfoToUpdate.card.person);
    const currency = useSelector(state => state.donateInfoToUpdate.card.currency);
    const id = useSelector(state => state.donateInfoToUpdate.card.id);

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const saveEntryButton = useSelector(state => state.i18n.buttons.saveButton);
    const cancelButton = useSelector(state => state.i18n.buttons.cancelButton);

    const bankNameLabel = useSelector(state => state.i18n.donate?.cardFormLabels["bank-name"])
    const primaryColorLabel = useSelector(state => state.i18n.donate?.cardFormLabels["primary-color"])
    const secondaryColorLabel = useSelector(state => state.i18n.donate?.cardFormLabels["secondary-color"])
    const textColorLabel = useSelector(state => state.i18n.donate?.cardFormLabels["text-color"])
    const linkLabel = useSelector(state => state.i18n.donate?.cardFormLabels.link)
    const cardHolderLabel = useSelector(state => state.i18n.donate?.cardFormLabels["card-holder"])
    const cardNumberLabel = useSelector(state => state.i18n.donate?.cardFormLabels["card-number"])
    const cardCurrencyLabel = useSelector(state => state.i18n.donate?.cardFormLabels["card-currency"])
    const attentionText = useSelector(state => state.i18n.donate?.cardFormInfo["attention-text"])

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setBankNamei18n(res[activeLanguage].donate["card-form-labels"]["bank-name"]))
                dispatch(setPrimaryColori18n(res[activeLanguage].donate["card-form-labels"]["primary-color"]))
                dispatch(setSecondaryColori18n(res[activeLanguage].donate["card-form-labels"]["secondary-color"]))
                dispatch(setTextColori18n(res[activeLanguage].donate["card-form-labels"]["text-color"]))
                dispatch(setLinki18n(res[activeLanguage].donate["card-form-labels"].link))
                dispatch(setCardHolder(res[activeLanguage].donate["card-form-labels"]["card-holder"]))
                dispatch(setCardNumber(res[activeLanguage].donate["card-form-labels"]["card-number"]))
                dispatch(setCardCurrency(res[activeLanguage].donate["card-form-labels"]["card-currency"]))
                dispatch(setAttentionText(res[activeLanguage].donate["card-form-info"]["attention-text"]))
            })
    }, [activeLanguage])

    const handleCancelButton = () => {
        dispatch(setEditCard(false));
        dispatch(setCreateCard(false))
        dispatch(setEmptyCardInfo())
    }

    const handleSaveEditButton = () => {
        const data = {
            bank: {
                name: bankName,
                "primary-color": primaryColor,
                "secondary-color": secondaryColor,
                "text-color": textColor,
                link,
            },
            count,
            person,
            currency,
            id
        }

        postRequest('http://localhost:3001/payment-details', JSON.stringify(data), 'PATCH')
            .then(() => getRequest('http://localhost:3001/payment-details'))
            .then(res => {
                dispatch(setEditCard(false))
                dispatch(setBanks(res.banks))
                dispatch(setEmptyCardInfo())
            })
    }

    const handleSaveCreateButton = () => {
        const data = {
            bank: {
                name: bankName,
                "primary-color": primaryColor,
                "secondary-color": secondaryColor,
                "text-color": textColor,
                link: link,
                cards: []
            },
            count,
            person,
            currency
        }

        postRequest('http://localhost:3001/payment-details', JSON.stringify(data), 'POST')
            .then(() => getRequest('http://localhost:3001/payment-details'))
            .then(res => {
                dispatch(setBanks(res.banks))
                dispatch(setCreateCard(false))
                dispatch(setEmptyCardInfo())
            })
    }

    return (
        <div className="donate-page--card-form">
            <p style={{width: "50%"}}><span style={{color: "red"}}>*</span> {attentionText}</p>
            <div className="donate-page--card-form--form">
                <div className="label-input-container">
                    <label>{bankNameLabel} <span style={{color: "red"}}> *</span> </label>
                    <Input type="text" value={bankName} onChange={event => dispatch(setBankName(event.target.value))}
                           autoFocus/>
                </div>
                <div className="label-input-container">
                    <label>{primaryColorLabel}</label>
                    <ColorPicker color={primaryColor} setColor={color => dispatch(setPrimaryColor(color))}/>
                </div>
                <div className="label-input-container">
                    <label>{secondaryColorLabel}</label>
                    <ColorPicker color={secondaryColor} setColor={color => dispatch(setSecondaryColor(color))}/>
                </div>
                <div className="label-input-container">
                    <label>{textColorLabel}</label>
                    <ColorPicker color={textColor} setColor={color => dispatch(setTextColor(color))}/>
                </div>
                <div className="label-input-container">
                    <label>{linkLabel}</label>
                    <Input type="text" value={link} onChange={event => dispatch(setLink(event.target.value))}/>
                </div>
                <div className="label-input-container">
                    <label>{cardHolderLabel}<span style={{color: "red"}}>*</span> </label>
                    <Input type="text" value={person} onChange={event => dispatch(setPerson(event.target.value))}/>
                </div>
                <div className="label-input-container">
                    <label>{cardNumberLabel}<span style={{color: "red"}}>*</span> </label>
                    <Input type="text" value={count} onChange={event => dispatch(setCount(event.target.value))}/>
                </div>
                <div className="label-input-container">
                    <label>{cardCurrencyLabel}<span style={{color: "red"}}>*</span> </label>
                    <Input type="text" value={currency} onChange={event => dispatch(setCurrency(event.target.value))}/>
                </div>
            </div>
            <div className="donate-page--buttons-container">
                <Button onClick={handleCancelButton}>{cancelButton}</Button>
                {<Button type="primary" onClick={toEdit ? handleSaveEditButton : handleSaveCreateButton}>{saveEntryButton}</Button>}
            </div>
        </div>
    )
}

export default CardForm;
