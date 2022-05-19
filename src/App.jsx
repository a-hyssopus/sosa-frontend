import React from "react"
import "antd/dist/antd.css";

import './App.scss'
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navbar";
import {Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import OurStories from "./components/OurStories/OurStories";
import Story from "./components/OurStories/Story";

const App = () => (
    <div className='App'>
        <Header/>
        <Navbar/>
        <Routes>
            <Route path={"/our-stories"} element={<OurStories/>}/>
            <Route path={"/our-stories/:id"} element={<Story/>}/>
            <Route path={"/home"} element={<MainPage/>}/>
            <Route exact path={"/"} element={<MainPage/>}/>
        </Routes>
    </div>
)

export default App;
