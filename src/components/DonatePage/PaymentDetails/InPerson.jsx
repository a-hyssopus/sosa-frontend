import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPersonId, setPersonName, setPersonNumber,} from "../../../store/sharedUIElements/donateInfoToUpdate";
import {setCreatePerson, setEditPerson, setInPerson} from "../../../store/sharedUIElements/donate";
import {deleteRequest} from "../../../utils/deleteRequest";
import {getRequest} from "../../../utils/getRequest";
import {Button} from "antd";
import DeleteConfirmPopup from "../../SharedElements/DeleteConfirmPopup";

const InPerson = () => {
    const dispatch = useDispatch();

    const inPersonText = useSelector(state => state.i18n.donate.inPersonText);
    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const deleteEntryButton = useSelector(state => state.i18n.buttons.deleteButton);

    const inPerson = useSelector(state => state.donate.inPerson);

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    const handlePersonEditClick = (person) => {
        dispatch(setPersonName(person.person));
        dispatch(setPersonNumber(person["mobile-number"]));
        dispatch(setPersonId(person._id));
        dispatch(setEditPerson(true));
    }

    const handlePersonDelete = (id) => {
        deleteRequest(`http://localhost:3001/payment-details/person/:${id}`, JSON.stringify({}))
            .then(() => getRequest(process.env.REACT_APP_BACKEND_URL + '/payment-details'))
            .then(res => {
                dispatch(setInPerson(res.inPerson))
            })
    }

    return (
        <div className="donate-page--in-person-container">
            <p className="donate-page--method-name">{inPersonText}:</p>
            {inPerson?.map(person =>
                <React.Fragment key={person._id}>
                    <p key={person["mobile-number"]}>{person.person}, {person["mobile-number"]}</p>
                    {isLoggedIn && <>
                        <Button style={{margin: "5px"}} onClick={() => handlePersonEditClick(person)}>{editButton}</Button>
                        <DeleteConfirmPopup confirmDeleteHandler={() => handlePersonDelete(person._id)}><Button style={{margin: "5px"}} danger>{deleteEntryButton}</Button></DeleteConfirmPopup>
                    </>}
                </React.Fragment>)}
            <br/>
            {isLoggedIn && <Button shape="circle" onClick={() => dispatch(setCreatePerson(true))}>+</Button>}
        </div>
    )
}

export default InPerson;
