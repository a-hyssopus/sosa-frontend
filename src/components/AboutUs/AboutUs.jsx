import React from "react";
import {useSelector} from "react-redux";
import {aboutUsText} from "../../utils/aboutUsText"

const AboutUs = () => {
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    return (
        <div className="text-only--container">
            <p style={{whiteSpace: "pre-wrap"}}>{aboutUsText[activeLanguage]}</p>
        </div>
    )
}

export default AboutUs;
