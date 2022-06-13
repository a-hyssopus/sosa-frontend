import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import "./style.scss"
import {setHeroMessage} from "../../../store/i18n/i18n";
import {getRequest} from "../../../utils/getRequest";

import CustomCarousel from "../Carousel/CustomCarousel";

const Content = () => {
    const activeLanguage = useSelector(state => state.i18n.activeLanguage)
    const heroMessage = useSelector(state => state.i18n.heroMessage)
    const dispatch = useDispatch();

    const firstSentence = heroMessage.substring(0, heroMessage.indexOf('.'));
    const secondSentence = heroMessage.substring(heroMessage.indexOf('.')+1)

    return (
        <>
            <div className="main-page-content-container">
                <div className="main-page-content-text">
                    <span>{firstSentence}.</span>
                    <br/>
                    <span>{secondSentence}</span>
                </div>
                <div className="main-page-content-carousel-container"><CustomCarousel/></div>
            </div>
            {/*<div className="main-page-content-text main-page-content-text--background"/>*/}
        </>
    )
}

export default Content;
