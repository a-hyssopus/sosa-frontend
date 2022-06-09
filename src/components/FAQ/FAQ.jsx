import React from "react";
import {useSelector} from "react-redux";

import {faqDescriptionText, listText} from "../../utils/faqText";
import "./style.scss"

const FAQ = () => {
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    return (
        <div className="faq-container">
            <p>{faqDescriptionText[activeLanguage]}</p>
            <ol>
                {listText[activeLanguage].map(item => <div key={item.question}>
                    <li style={{fontWeight: 700, fontSize: "18px"}}>{item.question}</li>
                    <br/>
                    <p>{item.answer}</p></div>)}
                    <br/>
            </ol>
        </div>
    )
}

export default FAQ
