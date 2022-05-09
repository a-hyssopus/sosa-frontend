import React, {Suspense, useState} from 'react'
import {Button} from "antd";
import {Link} from "react-router-dom";


import "./style.scss"
import logo from "../../assets/logo.png"

const Header = () => {
    const languages = ['Ro', 'En', 'Ru'];

    const setUILanguage = (lang) => {
        localStorage.setItem("lang", lang);
    }

    return (
        <Suspense fallback='...is loading'>
            <div className="header">
                <div className="logo-text">
                    <Link to="/">
                        <img className="logo" src={logo} alt="SOSA Logo"/>
                        <span></span>
                    </Link>
                </div>
                <ul className="language-buttons">
                    {languages.map(language => (
                        <li key={language}><Button
                            onClick={() => setUILanguage(language.toLowerCase())}
                            // className={language === activeLanguage ? "language-buttons--active" : ""}
                            type="default">{language}</Button></li>
                    ))}
                </ul>
            </div>
        </Suspense>
    )
}

export default Header
