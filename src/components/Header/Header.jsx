import React from 'react'
import {setActiveLanguage} from "../../store/i18n/i18n"
import {Button} from "antd";
import {Link} from "react-router-dom";

import "./style.scss"
import logo from "../../assets/logo.png"
import {useDispatch, useSelector} from "react-redux";

const Header = () => {
    const dispatch = useDispatch();

    const activeLanguage = useSelector(state => state.i18n.activeLanguage)

    const languages = ['Ro', 'En', 'Ru'];

    const setUILanguage = (lang) => {
        dispatch(setActiveLanguage(lang));
        localStorage.setItem("lang", lang);
    }

    return (
        <div className="header">
            <div className="logo-text">
                <Link to="/home">
                    <img className="logo" src={logo} alt="SOSA Logo"/>
                </Link>
            </div>
            <ul className="language-buttons">
                {languages.map(language => (
                    <li key={language}><Button
                        onClick={() => setUILanguage(language.toLowerCase())}
                        className={language.toLowerCase() === activeLanguage ? "language-buttons--active" : ""}
                        type="default">{language}</Button></li>
                ))}
            </ul>
        </div>
    )
}

export default Header
