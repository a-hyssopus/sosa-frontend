import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";

import CustomCarousel from "../Carousel/CustomCarousel";
import "./style.scss"
import {setHeroMessage} from "../../../store/i18n";
import {getRequest} from "../../../utils/getRequest";

const Content = () => {
    const activeLanguage = useSelector(state => state.i18n.activeLanguage)
    const heroMessage = useSelector(state => state.i18n.heroMessage)
    const dispatch = useDispatch();

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setHeroMessage(res[activeLanguage]["hero-message"]))
            })
    }, [activeLanguage])

    return (
        <div className="main-page-content-container">
            <div className="main-page-content-text">{heroMessage}</div>
            <CustomCarousel/>
        </div>
    )
}

export default Content;
