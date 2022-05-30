import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import {
    setCount,
    setCurrency,
    setEmptyInfo,
    setLink,
    setName,
    setPerson,
    setPrimaryColor,
    setSecondaryColor,
    setTextColor,
} from "../../store/shared-ui-elements/donateInfoToUpdate";

import {
    setAttentionText,
    setBankName,
    setCardCurrency,
    setCardHolder,
    setCardNumber,
    setLinki18n,
    setPrimaryColori18n,
    setSecondaryColori18n,
    setTextColori18n
} from "../../store/i18n"

import {setBanks, setCreate, setEdit} from "../../store/shared-ui-elements/donate";

import {getRequest} from "../../utils/getRequest";
import {postRequest} from "../../utils/postRequest";

const CardForm = ({toEdit, toCreate}) => {
    const dispatch = useDispatch();

    const bankName = useSelector(state => state.donateInfoToUpdate.name);
    const primaryColor = useSelector(state => state.donateInfoToUpdate.primaryColor);
    const secondaryColor = useSelector(state => state.donateInfoToUpdate.secondaryColor);
    const textColor = useSelector(state => state.donateInfoToUpdate.textColor);
    const link = useSelector(state => state.donateInfoToUpdate.link);
    const count = useSelector(state => state.donateInfoToUpdate.count);
    const person = useSelector(state => state.donateInfoToUpdate.person);
    const currency = useSelector(state => state.donateInfoToUpdate.currency);
    const id = useSelector(state => state.donateInfoToUpdate.id);

    const activeLanguage = useSelector(state => state.i18n.activeLanguage)
    const saveEntryButton = useSelector(state => state.i18n.buttons.saveButton);
    const cancelButton = useSelector(state => state.i18n.buttons.cancelButton);

    const bankNameLabel = useSelector(state => state.i18n.donate?.formLabels["bank-name"])
    const primaryColorLabel = useSelector(state => state.i18n.donate?.formLabels["primary-color"])
    const secondaryColorLabel = useSelector(state => state.i18n.donate?.formLabels["secondary-color"])
    const textColorLabel = useSelector(state => state.i18n.donate?.formLabels["text-color"])
    const linkLabel = useSelector(state => state.i18n.donate?.formLabels.link)
    const cardHolderLabel = useSelector(state => state.i18n.donate?.formLabels["card-holder"])
    const cardNumberLabel = useSelector(state => state.i18n.donate?.formLabels["card-number"])
    const cardCurrencyLabel = useSelector(state => state.i18n.donate?.formLabels["card-currency"])
    const attentionText = useSelector(state => state.i18n.donate?.formInfo["attention-text"])

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setBankName(res[activeLanguage].donate.formLabels["bank-name"]))
                dispatch(setPrimaryColori18n(res[activeLanguage].donate.formLabels["primary-color"]))
                dispatch(setSecondaryColori18n(res[activeLanguage].donate.formLabels["secondary-color"]))
                dispatch(setTextColori18n(res[activeLanguage].donate.formLabels["text-color"]))
                dispatch(setLinki18n(res[activeLanguage].donate.formLabels.link))
                dispatch(setCardHolder(res[activeLanguage].donate.formLabels["card-holder"]))
                dispatch(setCardNumber(res[activeLanguage].donate.formLabels["card-number"]))
                dispatch(setCardCurrency(res[activeLanguage].donate.formLabels["card-currency"]))
                dispatch(setAttentionText(res[activeLanguage].donate.formInfo["attention-text"]))
            })
    }, [activeLanguage])

    const handleCancelButton = () => {
        dispatch(setEdit(false));
        dispatch(setCreate(false))
        dispatch(setEmptyInfo())
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
                dispatch(setEdit(false))
                dispatch(setBanks(res.banks))
                dispatch(setEmptyInfo())
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
                dispatch(setCreate(false))
                dispatch(setEmptyInfo())
            })
    }

    return (
        <div>
            <p>{attentionText}</p>
            <label>{bankNameLabel}</label>
            <input type="text" value={bankName} onChange={event => dispatch(setName(event.target.value))}/>
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
