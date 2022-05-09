import React, {useState} from "react";
import "./style.scss"

const Counter = () => {
    // counter value will be fetched
    const [counter, setCounter] = useState(2596)

    return (
        <div className="main-page-counter">
            <span className="main-page-counter-text"><span className="counter">{counter}</span> sterilizations were performed this year due to your donations</span>
        </div>
    )
}

export default Counter;
