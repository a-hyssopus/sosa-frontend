import React from 'react';
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { store } from "./store/store"
import {Provider} from 'react-redux'

import './index.scss';
import App from './App';
import MainPage from "./components/MainPage/MainPage/MainPage";
import Blog from "./components/Blog/Blog";
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navbar";

const container = document.getElementById('root');
const root = createRoot(container);

const language = localStorage.getItem("lang") || "en";

root.render(<BrowserRouter>
    <Provider store={store}>
        <Header/>
        <Navbar/>
        <Routes>
            {/*<Route path={`/?${new URLSearchParams({"lang": language})}` || `home?${new URLSearchParams({"lang": language})}`} element={<MainPage/>}/>*/}
            <Route path={"/"} element={<MainPage/>}/>
            <Route path={"/blog"} element={<Blog/>}/>
        </Routes>
        <App/>
    </Provider></BrowserRouter>);
