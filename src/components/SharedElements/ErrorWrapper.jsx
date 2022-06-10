import React from "react";
import {useSelector} from "react-redux";

const ErrorWrapper = () => {
    const errorMessage = useSelector(state => state.i18n.errorMessage);

    return (
        <div className="something-went-wrong--page"><h1>{errorMessage}...</h1></div>
    )
}

export default ErrorWrapper;
