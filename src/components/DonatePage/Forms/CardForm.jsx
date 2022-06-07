import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    setCount,
    setCurrency,
    setEmptyCardInfo,
    setLink,
    setBankName,
    setPerson,
    setPrimaryColor,
    setSecondaryColor,
    setTextColor,
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

const CardForm = ({ toEdit, toCreate }) => {
    const dispatch = useDispatch();

    const bankName = useSelector(state =>  state.donateInfoToUpdate.card.bankName);
    const primaryColor = useSelector(state =>  state.donateInfoToUpdate.card.primaryColor);
    const secondaryColor = useSelector(state =>  state.donateInfoToUpdate.card.secondaryColor);
    const textColor = useSelector(state =>  state.donateInfoToUpdate.card.textColor);
    const link = useSelector(state =>  state.donateInfoToUpdate.card.link);
    const count = useSelector(state =>  state.donateInfoToUpdate.card.count);
    const person = useSelector(state =>  state.donateInfoToUpdate.card.person);
    const currency = useSelector(state =>  state.donateInfoToUpdate.card.currency);
    const id = useSelector(state =>  state.donateInfoToUpdate.card.id);

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
                dispatch(  setEmptyCardInfo())
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
        <div>
            <p>{attentionText}</p>
            <label>{bankNameLabel}</label>
            <input type="text" value={bankName} onChange={event => dispatch(setBankName(event.target.value))} autoFocus/>
            <label>{primaryColorLabel}</label>
            <input type="text" value={primaryColor} onChange={event => dispatch(setPrimaryColor(event.target.value))}/>
            <label>{secondaryColorLabel}</label>
            <input type="text" value={secondaryColor}
                   onChange={event => dispatch(setSecondaryColor(event.target.value))}/>
            <label>{textColorLabel}</label>
            <input type="text" value={textColor} onChange={event => dispatch(setTextColor(event.target.value))}/>
            <label>{linkLabel}</label>
            <input type="text" value={link} onChange={event => dispatch(setLink(event.target.value))}/>
            <label>{cardHolderLabel}</label>
            <input type="text" value={count} onChange={event => dispatch(setCount(event.target.value))}/>
            <label>{cardNumberLabel}</label>
            <input type="text" value={person} onChange={event => dispatch(setPerson(event.target.value))}/>
            <label>{cardCurrencyLabel}</label>
            <input type="text" value={currency} onChange={event => dispatch(setCurrency(event.target.value))}/>
            {toEdit && <button onClick={handleSaveEditButton}>{saveEntryButton}</button>}
            {toCreate && <button onClick={handleSaveCreateButton}>{saveEntryButton}</button>}
            <button onClick={handleCancelButton}>{cancelButton}</button>
        </div>
    )
}

export default CardForm;
