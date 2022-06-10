import React from "react";
import {useSelector} from "react-redux";
import {aboutUsText} from "../../utils/aboutUsText"

const AboutUs = () => {
    const activeLanguage = useSelector(state => state.i18n.activeLanguage);

    return (
        <div className="text-only--container">
            <p style={{whiteSpace: "pre-wrap"}}>{aboutUsText[activeLanguage]}</p>
            {/*<img src="https://site-547756.mozfiles.com/files/547756/medium/Paw_to_Hand_Help_Companions_Dogs.jpg"/>*/}
        </div>
    )
}

export default AboutUs;
