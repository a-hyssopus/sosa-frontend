import React from 'react';
import {createRoot} from "react-dom/client";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { store } from "./store/store"
import {Provider} from 'react-redux'


import './index.scss';
import App from './App';
import MainPage from "./components/MainPage/MainPage";
import OurStories from "./components/OurStories/OurStories"
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navbar";
import Story from "./components/OurStories/Story";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<BrowserRouter>
    <Provider store={store}>
        <Header/>
        <Navbar/>
        <Routes>
            <Route exact path={"/"} element={<MainPage/>}/>
            <Route exact path={"/home"} element={<MainPage/>}/>
            <Route path={"/our-stories"} element={<OurStories/>}/>
            <Route path={"/our-stories/:id"} element={<Story/>}/>
        </Routes>
        <App/>
    </Provider></BrowserRouter>);
