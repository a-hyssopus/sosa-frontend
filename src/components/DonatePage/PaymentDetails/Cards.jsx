import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {setBanks, setCreateCard, setEditCard} from "../../../store/sharedUIElements/donate";
import {
    setBankName,
    setCount,
    setCurrency,
    setId,
    setLink,
    setPerson,
    setPrimaryColor,
    setSecondaryColor,
    setTextColor
} from "../../../store/sharedUIElements/donateInfoToUpdate";
import {deleteRequest} from "../../../utils/deleteRequest";
import {getRequest} from "../../../utils/getRequest";

const Cards = () => {
    const dispatch = useDispatch();

    const banks = useSelector(state => state.donate.banks);
    const cardsText = useSelector(state => state.i18n.donate.cardsText);
    const deleteEntryButton = useSelector(state => state.i18n.buttons.deleteButton);
    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const saveEntryButton = useSelector(state => state.i18n.buttons.saveEntryButton);

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

        dispatch(setBankName(name));
        dispatch(setPrimaryColor(primaryColor));
        dispatch(setSecondaryColor(secondaryColor));
        dispatch(setTextColor(textColor));
        dispatch(setLink(link));
        dispatch(setCount(count));
        dispatch(setPerson(person));
        dispatch(setCurrency(currency));
        dispatch(setId(id))

        dispatch(setEditCard(true));
    }

    const handleCardDelete = (bank, card) => {
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
        <div className="donate-cards-container">
            {cardsText}
            {banks?.map(bank => bank?.cards?.map(card =>
                <React.Fragment key={card._id}>
                    <p>{bank.name} ({card.currency}): {card.count} {card.person}</p>
                    {isLoggedIn && <>
                        <button onClick={() => handleCardEditClick(bank, card)}>{editButton}</button>
                        <button onClick={() => handleCardDelete(bank, card)}>{deleteEntryButton}</button>
                    </>}
                </React.Fragment>
            ))}
            {isLoggedIn && <button onClick={() => dispatch(setCreateCard(true))}>{saveEntryButton}</button>}
        </div>
    )
}

export default Cards;
