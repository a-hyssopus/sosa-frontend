import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCountry, setEmail, setPaypalId} from "../../../store/sharedUIElements/donateInfoToUpdate";
import {setCreatePaypal, setEditPaypal, setPaypal} from "../../../store/sharedUIElements/donate";
import {deleteRequest} from "../../../utils/deleteRequest";
import {getRequest} from "../../../utils/getRequest";
import {Button} from "antd";
import DeleteConfirmPopup from "../../SharedElements/DeleteConfirmPopup";

const Paypal = () => {
    const dispatch = useDispatch();

    const paypal = useSelector(state => state.donate.PayPal);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const deleteEntryButton = useSelector(state => state.i18n.buttons.deleteButton);

    const handlePaypalEditClick = (count) => {
        const {email, country, _id} = count;

        dispatch(setEmail(email));
        dispatch(setCountry(country));
        dispatch(setPaypalId(_id));

        dispatch(setEditPaypal(true))
    }

    const handlePaypalDelete = (id) => {
        deleteRequest(`http://localhost:3001/payment-details/paypal/${id}`, JSON.stringify({}))
            .then(() => getRequest('http://localhost:3001/payment-details'))
            .then(res => {
                dispatch(setPaypal(res.PayPal))
            })
    }

    return (
        <div className="donate-page--paypal-container">
            <p className="donate-page--method-name">PayPal</p>
            {paypal?.counts?.map(count =>
                <React.Fragment key={count._id}><p key={count.email}>
                    {count.country}: {count.email}</p>
                    {isLoggedIn && <>
                        <Button style={{margin: "5px"}} onClick={() => handlePaypalEditClick(count)}>{editButton}</Button>
                        <DeleteConfirmPopup confirmDeleteHandler={() => handlePaypalDelete(count._id)}><Button style={{margin: "5px"}} danger>{deleteEntryButton}</Button></DeleteConfirmPopup>
                    </>}
                </React.Fragment>)}
            <br/>
            {isLoggedIn && <Button shape="circle" onClick={() => dispatch(setCreatePaypal(true))}>+</Button>}
        </div>
    )
}

export default Paypal;
