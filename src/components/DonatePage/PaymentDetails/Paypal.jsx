import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCountry, setEmail, setPaypalId} from "../../../store/shared-ui-elements/donateInfoToUpdate";
import {setCreatePaypal, setEditPaypal, setPaypal} from "../../../store/shared-ui-elements/donate";
import {deleteRequest} from "../../../utils/deleteRequest";
import {getRequest} from "../../../utils/getRequest";

const Paypal = () => {
    const dispatch = useDispatch();

    const paypal = useSelector(state => state.donate.PayPal);
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const saveEntryButton = useSelector(state => state.i18n.buttons.saveEntryButton);
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
        <div className="paypal-container">
            {paypal?.counts?.map(count =>
                <React.Fragment key={count._id}><p key={count.email}>
                    {count.country}: {count.email}</p>
                    {isLoggedIn && <>
                        <button onClick={() => handlePaypalEditClick(count)}>{editButton}</button>
                        <button onClick={() => handlePaypalDelete(count._id)}>{deleteEntryButton}</button>
                    </>}
                </React.Fragment>)}
            {isLoggedIn && <button onClick={() => dispatch(setCreatePaypal(true))}>{saveEntryButton}</button>}
        </div>
    )
}

export default Paypal;
