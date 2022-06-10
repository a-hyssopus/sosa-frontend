import React, {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import {getRequest} from "../../utils/getRequest";
import {
    setFailLoginMessage,
    setLoginText,
    setLogoutText,
    setPasswordText,
    setSuccessLoginMessage,
    setUsernameText
} from "../../store/i18n/i18n"
import {setIsLoggedIn} from "../../store/login/login";
import {Button, Input} from "antd";

import "./style.scss"

const LoginPage = () => {
    const dispatch = useDispatch();
    const history = useNavigate();

    const activeLanguage = useSelector(state => state.i18n.activeLanguage)
    const usernameText = useSelector(state => state.i18n.login["username-text"])
    const passwordText = useSelector(state => state.i18n.login["password-text"])
    const loginText = useSelector(state => state.i18n.login["login-text"])
    const logoutText = useSelector(state => state.i18n.login["logout-text"])
    const successLoginMessage = useSelector(state => state.i18n.login["success-login-message"])
    const failLoginMessage = useSelector(state => state.i18n.login["fail-login-message"])

    const isLoggedIn = useSelector(state => state.login.isLoggedIn)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginResult, setLoginResult] = useState('');

    useEffect(() => {
        getRequest(`${process.env.REACT_APP_BACKEND_URL}/i18n?${new URLSearchParams({"lang": activeLanguage})}`)
            .then(res => {
                dispatch(setUsernameText(res[activeLanguage].login["username-text"]))
                dispatch(setPasswordText(res[activeLanguage].login["password-text"]))
                dispatch(setLoginText(res[activeLanguage].login["login-text"]))
                dispatch(setLogoutText(res[activeLanguage].login["logout-text"]))
                dispatch(setSuccessLoginMessage(res[activeLanguage].login["success-login-message"]))
                dispatch(setFailLoginMessage(res[activeLanguage].login["fail-login-message"]))
            })
    }, [activeLanguage]);

    const handleLogin = () => {
        console.log(process.env.REACT_APP_BACKEND_URL + '/users/login');

        fetch(process.env.REACT_APP_BACKEND_URL + '/users/login', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                // 'Cross-Domain': true,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password})
        })
            .then(() => {
                const isLoggedInCookie = Cookies.get('isLoggedIn');
                console.log(isLoggedInCookie);
                if (isLoggedInCookie) {
                    setLoginResult(successLoginMessage);
                    dispatch(setIsLoggedIn(true)); // do I need it?
                    setTimeout(() => {
                        history('/home')
                    }, 2000)
                } else {
                    setLoginResult(failLoginMessage)
                }
            })
    }

    const handleLogOut = () => {
        fetch(process.env.REACT_APP_BACKEND_URL + '/users/logout', {
            method: 'POST',
            'credentials': 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        })
            .then(() => {
                dispatch(setIsLoggedIn(false))
                setTimeout(() => {
                    history('/home')
                }, 2000)
            })
    }

    return (
        <div className="login-page--container">
            {!isLoggedIn && (<>
                <div className="login-page--container--input-container">
                    <label>{usernameText}</label>
                    <Input type="text"
                           autoFocus
                           onChange={event => setUsername(event.target.value)}
                    />
                </div>
                <div className="login-page--container--input-container">
                    <label>{passwordText}</label>
                    <Input.Password iconRender={(visible) => (visible ? <EyeTwoTone/> : <EyeInvisibleOutlined/>)}
                                    onChange={event => setPassword(event.target.value)}/>
                </div>
                <Button type="primary" onClick={handleLogin}>{loginText}</Button>
                <p>{loginResult}</p>
            </>)
            }
            {isLoggedIn && (
                <Button type="primary" size="large" onClick={handleLogOut}>{logoutText}</Button>
            )}
        </div>
    )
}

export default LoginPage;
