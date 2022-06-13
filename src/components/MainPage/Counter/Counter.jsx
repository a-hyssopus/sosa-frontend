import React, {useEffect} from "react";
import "./style.scss"
import {useDispatch, useSelector} from "react-redux";
import {
    setDocumentId,
    setIsEditCounter,
    setSterilizationCounter
} from "../../../store/sharedUIElements/sterilizationCounter"
import {getRequest} from "../../../utils/getRequest";
import {postRequest} from "../../../utils/postRequest";
import {setSterilizationText} from "../../../store/i18n/i18n";
import {Button, InputNumber} from "antd";

const Counter = () => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(state => state.i18n.activeLanguage);
    const sterilizationCounter = useSelector(state => state.sterilizationCounter.counter);
    const isEditCounter = useSelector(state => state.sterilizationCounter.isEditCounter);
    const documentId = useSelector(state => state.sterilizationCounter.documentId);
    const sterilizationText = useSelector(state => state.i18n.sterilizationText);

    const saveEntryButton = useSelector(state => state.i18n.buttons.saveButton);
    const cancelButton = useSelector(state => state.i18n.buttons.cancelButton);

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    useEffect(() => {
        getRequest(process.env.REACT_APP_BACKEND_URL + '/shared-ui-elements')
            .then(res => {
                dispatch(setSterilizationCounter(res["sterilization-counter"]))
                dispatch(setDocumentId(res._id))
            })
    }, []);

    const saveCounterHandler = () => {
        postRequest(`${process.env.REACT_APP_BACKEND_URL}/shared-ui-elements/${documentId}`,
            JSON.stringify({"sterilization-counter": sterilizationCounter}),
            'PATCH')
            .then(() => dispatch(setIsEditCounter(false)))
    };

    const counterCancelHandler = () => {
        getRequest(process.env.REACT_APP_BACKEND_URL + '/shared-ui-elements')
            .then(res => {
                dispatch(setIsEditCounter(false))
                dispatch(setSterilizationCounter(res["sterilization-counter"]))
                dispatch(setDocumentId(res._id))
            })
    }

    const counterClickHandler = () => {
        dispatch(setIsEditCounter(true))
    }

    const updateCounterLayout = () => (
        <>
            <InputNumber value={sterilizationCounter}
                   onChange={value => dispatch(setSterilizationCounter(value))}/>
            <Button onClick={saveCounterHandler}>{saveEntryButton}</Button>
            <Button onClick={counterCancelHandler}>{cancelButton}</Button>
        </>
    )

    const readCounterLayout = () => <span   style={{cursor: isLoggedIn ? "pointer" : ""}} className="counter"
                                          onClick={isLoggedIn ? counterClickHandler : undefined}>{sterilizationCounter}</span>


    return (
        <div className="main-page-counter">
            <span className="main-page-counter-text">
                {isEditCounter ? updateCounterLayout() : readCounterLayout()} {sterilizationText}</span>
        </div>
    )
}

export default Counter;
