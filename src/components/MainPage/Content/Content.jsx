import React from "react";
import CustomCarousel from "../Carousel/CustomCarousel";
import "./style.scss"

const Content = () => {
    return (
        <div className="main-page-content-container">
            <span className="main-page-content-text">We bring together people, those who sterilize stray animals with people that are willing to help financially. Group Sterilization of stray animals was created to make process of collecting donations (most method have minimum of 10lei) and distribution of funds more streamlined and transparent.</span>
            <CustomCarousel/>
        </div>
    )
}

export default Content;
