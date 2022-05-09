import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setNavigationButtons } from "../../store/i18n"

import instagram from "../../assets/instagramWhite.png"
import facebook from "../../assets/facebook-logo.png"
import heart from "../../assets/heart.png"

import {Link} from "react-router-dom";
import "./style.scss";

const Navbar = () => {
    const navbarValues = useSelector((state) => state.i18n.navbar)
    const dispatch = useDispatch()

    const routes = ["home", "blog", "faq", "reports", "about"];
    const language = localStorage.getItem("lang") || "en";
    const [activeTab, setActiveTab] = useState("Home");

    useEffect(() => {
        fetch(`http://localhost:3001/i18n?${new URLSearchParams({"lang": language})}`)
            .then(res => res.json())
            .then(res => console.log(res?.[language]?.navbar))
            .then(res => dispatch(setNavigationButtons(res?.[language]?.navbar)))
            .then(res => console.log(navbarValues))
    }, [])

    return (
        <div className="navigation-container">
            <button className="navigation-button-donate">
                Donate<img src={heart} alt="Heart"/>
            </button>
            <ul>
                {navbarValues.map((element, index) => <li><Link to={`/${routes[index]}`}
                                                    className={element === activeTab ? "navigation-tab--active" : ""}>{element}</Link>
                    {/*TODO change className logic */}
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

