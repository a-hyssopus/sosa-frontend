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

const App = () => (
    <div className='App'/>
)

export default App;
