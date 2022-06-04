import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {setPersonId, setPersonName, setPersonNumber,} from "../../../store/shared-ui-elements/donateInfoToUpdate";
import {setCreatePerson, setEditPerson, setInPerson} from "../../../store/shared-ui-elements/donate";
import {deleteRequest} from "../../../utils/deleteRequest";
import {getRequest} from "../../../utils/getRequest";

const InPerson = () => {
    const dispatch = useDispatch();

    const inPersonText = useSelector(state => state.i18n.donate.inPersonText);
    const editButton = useSelector(state => state.i18n.buttons.editButton);
    const saveEntryButton = useSelector(state => state.i18n.buttons.saveEntryButton);
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
            .then(() => getRequest('http://localhost:3001/payment-details'))
            .then(res => {
                dispatch(setInPerson(res.inPerson))
            })
    }

    return (
        <div className="in-person-container">
            {inPersonText}:
            {inPerson?.map(person =>
                <React.Fragment key={person._id}>
                    <p key={person["mobile-number"]}>{person.person}, {person["mobile-number"]}</p>
                    {isLoggedIn && <>
                        <button onClick={() => handlePersonEditClick(person)}>{editButton}</button>
                        <button onClick={() => handlePersonDelete(person._id)}>{deleteEntryButton}</button>
                    </>}
                </React.Fragment>)}
            {isLoggedIn && <button onClick={() => dispatch(setCreatePerson(true))}>{saveEntryButton}</button>}
        </div>
    )
}

export default InPerson;
