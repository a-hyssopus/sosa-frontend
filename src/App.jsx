// import './App.css';
// import {useEffect, useState} from "react";
//
// function App() {
//
//     const [blogPosts, setBlogPosts] = useState({data: []})
//
//     useEffect(() => {
//         fetch('http://localhost:3001/blog-posts')
//             .then(res => res.json())
//             .then(res => setBlogPosts(res))
//             .then(console.log(blogPosts))
//     }, [])
//
//     return (<div className="App">
//             {blogPosts.data.map((el, index) => <p key={index}>{el.title}<br/>{el.text}</p>)}
//         </div>
//
//     );
// }
//
// export default App;

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

// const App = () => {
//     return (
//         <div className="app">
//             <Routes>
//                 <HomeLayoutRoute path="/" element={<Home />} />
//                 <PrivateRoute path="/" element={<PrivateScreen/>} />
//                 <Route path="/login" element={<LoginScreen/>} />
//                 <Route path="/register" element={<RegisterScreen/>} />
//                 <Route path="/forgotpassword" element={<ForgotPasswordScreen/>}/>
//                 <Route path="/passwordreset/:resetToken" element={<ResetPasswordScreen/>}/>
//             </Routes>
//         </div>
//     );
// };

export default App;
