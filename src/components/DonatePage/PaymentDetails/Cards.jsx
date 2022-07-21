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
import {Button} from "antd";
import DeleteConfirmPopup from "../../SharedElements/DeleteConfirmPopup";

const Cards = () => {
    const dispatch = useDispatch();

    const banks = useSelector(state => state.donate.banks);
    const cardsText = useSelector(state => state.i18n.donate.cardsText);
    const deleteEntryButton = useSelector(state => state.i18n.buttons.delete);
    const edit = useSelector(state => state.i18n.buttons.edit);

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const handleCardEditClick = (bank, card) => {
        const {
            name,
            "primary-color": primaryColor,
            "secondary-color": secondaryColor,
            "text-color": textColor,
            link = ''
        } = bank;
        const {person, count, currency, _id: id} = card;

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
        deleteRequest(process.env.REACT_APP_BACKEND_URL + '/payment-details', JSON.stringify({
            name: bank.name,
            id: card._id
        }))
            .then(() => getRequest(process.env.REACT_APP_BACKEND_URL + '/payment-details'))
            .then(res => {
                dispatch(setBanks(res.banks))
            })
    }

    return (
        <div className="donate-cards-container">
            <p className="donate-page--method-name">{cardsText}</p>
            {banks?.map(bank => bank?.cards?.map(card =>
                <React.Fragment key={card._id}>
                    <p>{bank.name} ({card.currency}): {card.count} - {card.person}</p>
                    {isLoggedIn && <>
                        <Button style={{margin: "5px"}} onClick={() => handleCardEditClick(bank, card)}>{edit}</Button>
                        <DeleteConfirmPopup confirmDeleteHandler={() => handleCardDelete(bank, card)}><Button  style={{margin: "5px"}} danger>{deleteEntryButton}</Button></DeleteConfirmPopup>
                    </>}
                </React.Fragment>
            ))}
            <br/>
            {isLoggedIn && <Button shape="circle" onClick={() => dispatch(setCreateCard(true))}>+</Button>}
        </div>
    )
}

export default Cards;
