import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {setBanks, setCreate, setEdit, setInPerson, setPaypal} from "../../store/shared-ui-elements/donate";
import {
    setCount,
    setCurrency,
    setId,
    setLink,
    setName,
    setPerson,
    setPrimaryColor,
    setSecondaryColor,
    setTextColor
} from "../../store/shared-ui-elements/donateInfoToUpdate";

import TwoColouredButton from "../SharedElements/TwoColouredButton";
import {deleteRequest} from "../../utils/deleteRequest";
import {getRequest} from "../../utils/getRequest";

const DonatePageInfo = () => {
    const dispatch = useDispatch();

    const cardsText = useSelector(state => state.i18n.donate.cardsText);
    const inPersonText = useSelector(state => state.i18n.donate.inPersonText);
    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const saveEntryButton = useSelector(state => state.i18n.buttons.saveEntryButton);
    const deleteEntryButton = useSelector(state => state.i18n.buttons.deleteButton);

    const banks = useSelector(state => state.donate.banks);
    const paypal = useSelector(state => state.donate.PayPal);
    const inPerson = useSelector(state => state.donate.inPerson);

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const handleCardEditClick = (bank, card) => {
        const {
            name,
            "primary-color": primaryColor,
            "secondary-color": secondaryColor,
            "text-color": textColor,
            link = ''
        } = bank;
        const {count, person, currency, _id: id} = card;

        dispatch(setName(name));
        dispatch(setPrimaryColor(primaryColor));
        dispatch(setSecondaryColor(secondaryColor));
        dispatch(setTextColor(textColor));
        dispatch(setLink(link));
        dispatch(setCount(count));
        dispatch(setPerson(person));
        dispatch(setCurrency(currency));
        dispatch(setId(id))

        dispatch(setEdit(true));
    }

    const handleDelete = (bank, card) => {
        deleteRequest('http://localhost:3001/payment-details', JSON.stringify({
            name: bank.name,
            id: card._id
        }))
            .then(() => getRequest('http://localhost:3001/payment-details'))
            .then(res => {
                dispatch(setBanks(res.banks))
            })
    }

    return (
        <div>
            <div className="donate-cards-container">
                {cardsText}
                {banks?.map(bank => bank?.cards?.map(card => <p key={card.id}>
                    {bank.name} ({card.currency}): {card.count} {card.person}
                    {isLoggedIn && <>
                        <button onClick={() => handleCardEditClick(bank, card)}>{editButton}</button>
                        <button onClick={() => handleDelete(bank, card)}>{deleteEntryButton}</button>
                    </>}
                </p>))}
                {isLoggedIn && <button onClick={() => dispatch(setCreate(true))}>{saveEntryButton}</button>}
            </div>

            <div>
                {banks.length && banks.map(bank => <TwoColouredButton primaryColor={bank["primary-color"]}
                                                                      secondaryColor={bank["secondary-color"]}
                                                                      linkTo={bank.link}
                                                                      text={bank.name}
                                                                      key={bank.name}
                                                                      textColor={bank["text-color"]}/>)}
                <TwoColouredButton primaryColor={paypal["primary-color"]}
                                   secondaryColor={paypal["secondary-color"]}
                                   linkTo={paypal.link}
                                   text="Paypal"
                                   textColor={paypal["text-color"]}
                                   src=""/>
            </div>

            <div className="paypal-container">
                {paypal?.counts?.map(count => <p key={count.email}>{count.country}: {count.email}</p>)}
                {isLoggedIn && <>
                    <button>{editButton}</button>
                    <button>{saveEntryButton}</button>
                </>}
            </div>

            <div className="in-person-container">
                {inPersonText}:
                {inPerson?.map(el => <p key={el["mobile-number"]}>{el.person}, {el["mobile-number"]}</p>)}
                {isLoggedIn && <>
                    <button>{editButton}</button>
                    <button>{saveEntryButton}</button>
                </>}
            </div>
        </div>
    )
}

export default DonatePageInfo;
