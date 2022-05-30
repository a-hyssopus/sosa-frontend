import React from "react"
import "antd/dist/antd.css";

import './App.scss'
import Header from "./components/Header/Header";
import Navbar from "./components/Navigation/Navbar";
import {Link, Route, Routes} from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import OurStories from "./components/OurStories/OurStories";
import Story from "./components/OurStories/Story";
import DonatePage from "./components/DonatePage/DonatePage";
import LoginPage from "./components/LoginPage/LoginPage";

const App = () => (
    <div className='App'>
        <Header/>
        <Navbar/>
        <Routes>
            <Route exact path={"/donate"} element={<DonatePage/>}/>
            <Route exact path={"/our-stories"} element={<OurStories/>}/>
            <Route exact path={"/our-stories/:id"} element={<Story/>}/>
            {/*<Route exact path={"/about"} element={<AboutUs/>}/>*/}
            {/*<Route exact path={"/faq"} element={<FAQ/>}/>*/}
            {/*<Route exact path={"/reports"} element={<Reports/>}/>*/}
            <Route exact path={"/login"} element={<LoginPage/>}/>
            <Route exact path={"/home"} element={<MainPage/>}/>
            <Route exact path={"/"} element={<MainPage/>}/>
        </Routes>
        <Link to={"/login"}>Log In</Link>
    </div>
)

export default App;
