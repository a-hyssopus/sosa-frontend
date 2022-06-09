import React, {Suspense} from 'react'
import {setActiveLanguage} from "../../store/i18n/i18n"
import {Button} from "antd";
import {Link} from "react-router-dom";


import "./style.scss"
import logo from "../../assets/logo.png"
import {useDispatch } from "react-redux";

const Header = () => {
    const dispatch = useDispatch()

    const languages = ['Ro', 'En', 'Ru'];

    const setUILanguage = (lang) => {
        dispatch(setActiveLanguage(lang));
        localStorage.setItem("lang", lang);
    }

    return (
        <Suspense fallback='...is loading'>
            <div className="header">
                <div className="logo-text">
                    <Link to="/">
                        <img className="logo" src={logo} alt="SOSA Logo"/>
                    </Link>
                </div>
                <ul className="language-buttons">
                    {languages.map(language => (
                        <li key={language}><Button
                            onClick={() => setUILanguage(language.toLowerCase())}
                            // className={language === activeLanguage ? "language-buttons--active" : ""}
                            // TODO change CSS class logic
                            type="default">{language}</Button></li>
                    ))}
                </ul>
            </div>
        </Suspense>
    )
}

export default Header
