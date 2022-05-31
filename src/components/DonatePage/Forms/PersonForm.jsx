import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRequest} from "../../../utils/getRequest";
import {setPersonNameLabel, setPersonNumberLabel} from "../../../store/i18n";
import {setCreateCard, setCreatePerson, setEditPerson, setInPerson} from "../../../store/shared-ui-elements/donate";
import {
    setEmptyCardInfo,
    setEmptyPersonInfo,
    setPersonName,
    setPersonNumber
} from "../../../store/shared-ui-elements/donateInfoToUpdate";
import {postRequest} from "../../../utils/postRequest";

const PersonForm = ({ toEdit, toCreate }) => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const saveEntryButton = useSelector(state => state.i18n.buttons.saveButton);
    const cancelButton = useSelector(state => state.i18n.buttons.cancelButton);

    const personName = useSelector(state => state.donateInfoToUpdate.person.name);
    const personNumber = useSelector(state => state.donateInfoToUpdate.person.number);
    const id = useSelector(state => state.donateInfoToUpdate.person.id);

    const nameLabel = useSelector(state => state.i18n.donate.personFormLabels["person-label"]);
    const nubmerLabel = useSelector(state => state.i18n.donate.personFormLabels["number-label"]);

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setPersonNameLabel(res[activeLanguage].donate["person-form-labels"]["person-label"]))
                dispatch(setPersonNumberLabel(res[activeLanguage].donate["person-form-labels"]["number-label"]))
            })
    }, [activeLanguage])

    const handleCancelButton = () => {
        dispatch(setEditPerson(false));
        dispatch(setCreatePerson(false))
        dispatch(setEmptyPersonInfo())
    }

    const handleSaveEditButton = () => {
        const data = {
            person: personName,
            "mobile-number": personNumber
        }

        postRequest(`http://localhost:3001/payment-details/person/${id}`, JSON.stringify(data), 'PATCH')
            .then(() => getRequest('http://localhost:3001/payment-details'))
            .then(res => {
                dispatch(setInPerson(res.inPerson))
                dispatch(setEditPerson(false))
                dispatch(setEmptyPersonInfo())
            })
    }

    const handleSaveCreateButton = () => {
        const data = {
            person: personName,
            "mobile-number": personNumber
        }

        postRequest('http://localhost:3001/payment-details/person', JSON.stringify(data), 'POST')
            .then(() => getRequest('http://localhost:3001/payment-details'))
            .then(res => {
                dispatch(setInPerson(res.inPerson))
                dispatch(setCreatePerson(false))
                dispatch(setEmptyPersonInfo())
            })
    }

    return (
        <div>
            <label>{nameLabel}</label>
            <input type="text" value={personName} onChange={event => dispatch(setPersonName(event.target.value))}/>
            <label>{nubmerLabel}</label>
            <input type="text" value={personNumber} onChange={event => dispatch(setPersonNumber(event.target.value))}/>
            {toEdit && <button onClick={handleSaveEditButton}>{saveEntryButton}</button>}
            {toCreate && <button onClick={handleSaveCreateButton}>{saveEntryButton}</button>}
            <button onClick={handleCancelButton}>{cancelButton}</button>
        </div>
    )
}

export default PersonForm;
