import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {
    setNavigationButtons,
    setDonateButton,
    setSaveButton,
    setEditButton,
    setSterilizationText,
    setDeleteButton,
    setAddPostButton
} from "../../store/i18n"

import instagram from "../../assets/instagramWhite.png"
import facebook from "../../assets/facebook-logo.png"
import heart from "../../assets/heart.png"

import {Link} from "react-router-dom";
import "./style.scss";
import {getRequest} from "../../utils/getRequest";

const Navbar = () => {
    const navbarValues = useSelector(state => state.i18n.navbar)
    const activeLanguage = useSelector(state => state.i18n.activeLanguage)
    const donateButton = useSelector(state => state.i18n.donateButton)
    const dispatch = useDispatch()

    const routes = ["home", "our-stories", "faq", "reports", "about"];
    const facebookPageURL = "https://www.facebook.com/sosanimalsmd/";
    const instagramPageURL = "https://www.instagram.com/sosanimals.md/";
    const [activeTab, setActiveTab] = useState("Home");

    useEffect(() => {
        getRequest(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setNavigationButtons(res[activeLanguage].navbar))
                dispatch(setDonateButton(res[activeLanguage]["donate-button"]))
                dispatch(setSaveButton(res[activeLanguage]["save-button"]))
                dispatch(setEditButton(res[activeLanguage]["edit-button"]))
                dispatch(setDeleteButton(res[activeLanguage]["delete-button"]))
                dispatch(setAddPostButton(res[activeLanguage]["add-post-button"]))
                dispatch(setSterilizationText(res[activeLanguage]["sterilization-text"]))
            })
    }, [activeLanguage])

    return (
        <div className="navigation-container">
            <Link to={"/donate"}>
            <button className="navigation-button-donate">
                {donateButton}<img src={heart} alt="Heart"/>
            </button></Link>
            <ul>
                {navbarValues.map((element, index) => <li key={element}><Link to={`/${routes[index]}`}
                                                                              className={element === activeTab ? "navigation-tab--active" : ""}
                                                                              onClick={() => setActiveTab(element)}>{element}</Link>
                    {/*TODO fix style bug on changing language*/}
                </li>)}
            </ul>
            <div className="navigation-icons">
                <li><a href={facebookPageURL} target="_blank" rel="noreferrer"><img src={facebook} alt="Facebook Logo"/></a></li>
                <li><a href={instagramPageURL} target="_blank" rel="noreferrer"><img src={instagram} alt="Instagram Logo"/></a></li>
            </div>
        </div>
    )
}

export default Navbar;

