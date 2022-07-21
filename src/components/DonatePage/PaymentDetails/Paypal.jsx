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

    const edit = useSelector(state => state.i18n.buttons.edit);
    const deleteEntryButton = useSelector(state => state.i18n.buttons.delete);

    const handlePaypalEditClick = (count) => {
        const {email, country, _id} = count;

        dispatch(setEmail(email));
        dispatch(setCountry(country));
        dispatch(setPaypalId(_id));

        dispatch(setEditPaypal(true))
    }

    const handlePaypalDelete = (id) => {
        deleteRequest(`${process.env.REACT_APP_BACKEND_URL}/payment-details/paypal/${id}`, JSON.stringify({}))
            .then(() => getRequest(process.env.REACT_APP_BACKEND_URL + '/payment-details'))
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
                        <Button style={{margin: "5px"}} onClick={() => handlePaypalEditClick(count)}>{edit}</Button>
                        <DeleteConfirmPopup confirmDeleteHandler={() => handlePaypalDelete(count._id)}><Button style={{margin: "5px"}} danger>{deleteEntryButton}</Button></DeleteConfirmPopup>
                    </>}
                </React.Fragment>)}
            <br/>
            {isLoggedIn && <Button shape="circle" onClick={() => dispatch(setCreatePaypal(true))}>+</Button>}
        </div>
    )
}

export default Paypal;
