import React from "react";
import {useSelector} from "react-redux";

import {faqDescriptionText, listText} from "../../utils/faqText";

const FAQ = () => {
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    return (
        <div>
            <p>{faqDescriptionText[activeLanguage]}</p>
            <ol>
            {listText[activeLanguage].map(item => <div key={item.question}><li><h4>{item.question}</h4></li><p>{item.answer}</p></div>)}
            </ol>
        </div>
    )
}

export default FAQ
