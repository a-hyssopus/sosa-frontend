import React, {useEffect} from "react";
import "./style.scss"
import {useDispatch, useSelector} from "react-redux";
import {
    setDocumentId,
    setIsEditCounter,
    setSterilizationCounter
} from "../../../store/shared-ui-elements/sterilizationCounter"
import {getRequest} from "../../../utils/getRequest";
import {postRequest} from "../../../utils/postRequest";

const Counter = () => {
    const dispatch = useDispatch();

    const sterilizationCounter = useSelector(state => state.sterilizationCounter.counter);
    const isEditCounter = useSelector(state => state.sterilizationCounter.isEditCounter);
    const documentId = useSelector(state => state.sterilizationCounter.documentId);

    const saveEntryButton = useSelector(state => state.i18n.buttons.saveButton);
    const cancelButton = useSelector(state => state.i18n.buttons.cancelButton);

    const isLoggedIn = useSelector(state => state.login.isLoggedIn);

    useEffect(() => {
        getRequest('http://localhost:3001/shared-ui-elements')
            .then(res => {
                dispatch(setSterilizationCounter(res["sterilization-counter"]))
                dispatch(setDocumentId(res._id))
            })
    }, []);


    const saveCounterHandler = () => {
        postRequest(`http://localhost:3001/shared-ui-elements/${documentId}`,
            JSON.stringify({"sterilization-counter": sterilizationCounter}),
            'PATCH')
            .then(() => dispatch(setIsEditCounter(false)))
    };

    const counterCancelHandler = () => {
        getRequest('http://localhost:3001/shared-ui-elements')
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
            <input type="number" value={sterilizationCounter}
                   onChange={event => dispatch(setSterilizationCounter(event.target.value))}/>
            <button onClick={saveCounterHandler}>{saveEntryButton}</button>
            <button onClick={counterCancelHandler}>{cancelButton}</button>
        </>
    )

    const readCounterLayout = () => <span className="counter"
                                          onClick={isLoggedIn ? counterClickHandler : undefined}>{sterilizationCounter}</span>


    return (
        <div className="main-page-counter">
            <span className="main-page-counter-text">
                {isEditCounter ? updateCounterLayout() : readCounterLayout()}
                sterilizations were performed this year due to your donations</span>
        </div>
    )
}

export default Counter;
