import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {setNavigationButtons, setDonateButton} from "../../store/i18n"

import instagram from "../../assets/instagramWhite.png"
import facebook from "../../assets/facebook-logo.png"
import heart from "../../assets/heart.png"

import {Link} from "react-router-dom";
import "./style.scss";

const Navbar = () => {
    const navbarValues = useSelector(state => state.i18n.navbar)
    const activeLanguage = useSelector(state => state.i18n.activeLanguage)
    const donateButton = useSelector(state => state.i18n.donateButton)
    const dispatch = useDispatch()

    const routes = ["home", "blog", "faq", "reports", "about"];
    const [activeTab, setActiveTab] = useState("Home");

    useEffect(() => {
        fetch(`http://localhost:3001/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => res.json())
            .then(res => {
                dispatch(setNavigationButtons(res[activeLanguage].navbar))
                dispatch(setDonateButton(res[activeLanguage]["donate-button"]))
            })
    }, [activeLanguage])

    return (
        <div className="navigation-container">
            <button className="navigation-button-donate">
                {donateButton}<img src={heart} alt="Heart"/>
            </button>
            <ul>
                {navbarValues.map((element, index) => <li key={element}><Link to={`/${routes[index]}`}
                                                                              className={element === activeTab ? "navigation-tab--active" : ""}
                                                                              onClick={() => setActiveTab(element)}>{element}</Link>
                </li>)}
            </ul>
            <div className="navigation-icons">
                <li><img src={facebook} alt="Facebook Logo"/></li>
                <li><img src={instagram} alt="Instagram Logo"/></li>
            </div>
        </div>
    )
}

export default Navbar;

