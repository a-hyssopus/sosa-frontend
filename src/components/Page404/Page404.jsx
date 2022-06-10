import React from "react";
import paws404 from "../../assets/paws404.png"

import "./style.scss";

const Page404 = () => (
    <div className="page-not-found--container">
        <h1>Page Not Found!</h1>
        <img src={paws404}/>
    </div>
)

export default Page404;
