import React, {useState} from 'react';

import dog from "../../../assets/dog.jpg";
import chainedDog from "../../../assets/chainedDog.jpg";
import kittens from "../../../assets/kittens.png"
import arrow from "../../../assets/arrow.png";

import "./style.scss"

const CustomCarousel = () => {
    const images = [dog, kittens, chainedDog];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [carouselItemClass, setCarouselItemClass] = useState("carousel-item")

    setTimeout(() => {
        setCarouselItemClass("carousel-item carousel-item-active")
    }, 400)

    const onClickNextHandler = () => {
        setCarouselItemClass(prev => prev === "carousel-item" ? "carousel-item carousel-item-active" : "carousel-item");
        setTimeout(() => {
            setCurrentImageIndex(prevIndex => prevIndex !== images.length - 1 ? prevIndex + 1 : 0)
            setCarouselItemClass("carousel-item carousel-item-active")
        }, 400)
    }

    const onClickPreviousHandler = () => {
        setCarouselItemClass(prev => prev === "carousel-item" ? "carousel-item carousel-item-active" : "carousel-item");
        setTimeout(() => {
            setCurrentImageIndex(prevIndex => prevIndex !== 0 ? prevIndex - 1 : images.length - 1)
            setCarouselItemClass("carousel-item carousel-item-active")
        }, 400)
    }


    return (
        <div className="carousel-container">
            <div className="carousel-item carousel-item-background">
                <img className={carouselItemClass} src={images[currentImageIndex]}/>
                <img className="carousel-control-arrow" src={arrow} onClick={onClickNextHandler}/>
                <img className="carousel-control-arrow carousel-control-arrow--back" src={arrow}
                     onClick={onClickPreviousHandler}/>
            </div>
        </div>
    )
}

export default CustomCarousel;
