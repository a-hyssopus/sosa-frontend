import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRequest} from "../../../utils/getRequest";
import {setPersonNameLabel, setPersonNumberLabel} from "../../../store/i18n/i18n";
import {setCreatePerson, setEditPerson, setInPerson} from "../../../store/sharedUIElements/donate";
import {setEmptyPersonInfo, setPersonName, setPersonNumber} from "../../../store/sharedUIElements/donateInfoToUpdate";
import {postRequest} from "../../../utils/postRequest";
import {Button, Input} from "antd";

const PersonForm = ({toEdit, toCreate}) => {
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
        <div className="donate-page--in-person-form">
            <div className="donate-page--in-person-form--form">
                <div className="label-input-container">
                    <label>{nameLabel}</label>
                    <Input type="text" value={personName} autoFocus
                           onChange={event => dispatch(setPersonName(event.target.value))}/>
                </div>
                <div className="label-input-container">
                    <label>{nubmerLabel}</label>
                    <Input type="text" value={personNumber}
                           onChange={event => dispatch(setPersonNumber(event.target.value))}/>
                </div>
            </div>
            <div className="donate-page--buttons-container">
                <Button onClick={handleCancelButton}>{cancelButton}</Button>
                {<Button type="primary"
                         onClick={toEdit ? handleSaveEditButton : handleSaveCreateButton}>{saveEntryButton}</Button>}
            </div>
        </div>
    )
}

export default PersonForm;
