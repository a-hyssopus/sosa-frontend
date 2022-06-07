import React from "react";
import {useSelector} from "react-redux";
import {aboutUsText} from "../../utils/aboutUsText"

const AboutUs = () => {
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    return (
        <div>
            {aboutUsText[activeLanguage]}
        </div>
    )
}

export default AboutUs;
