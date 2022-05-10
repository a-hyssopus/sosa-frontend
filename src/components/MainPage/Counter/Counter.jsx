import React, {useEffect} from "react";
import "./style.scss"
import {useDispatch, useSelector} from "react-redux";
import {setSterilizationCounter} from "../../../store/sterilizationCounter";

const Counter = () => {
    const sterilizationCounter = useSelector(state => state.sterilizationCounter.counter)
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost:3001/shared-ui-elements')
            .then(res => res.json())
            .then(res => dispatch(setSterilizationCounter(res[0]["sterilization-counter"])))
    }, [sterilizationCounter])

    return (
        <div className="main-page-counter">
            <span className="main-page-counter-text"><span className="counter">{sterilizationCounter}</span> sterilizations were performed this year due to your donations</span>
        </div>
    )
}

export default Counter;
