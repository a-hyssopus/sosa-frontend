import React from 'react'
import {Carousel, Col, Row} from 'antd'

import dog from "../../../assets/dog.jpg"
import chainedDog from "../../../assets/chainedDog.jpg"

import "./style.scss"

const SampleNextArrow = ({className, style, onClick}) => (
    <div
        className={className}
        style={{...style, background: 'red'}}
        onClick={onClick}
    />
)

const SamplePrevArrow = ({className, style, onClick}) => (
    <div
        className={className}
        style={{...style, background: 'green'}}
        onClick={onClick}
    />
)

const settings = {
    nextArrow: <SampleNextArrow/>,
    prevArrow: <SamplePrevArrow/>
}

const CustomCarousel = () => {
    return (
        <div className="main-page-carousel">
            {/*<Row justify="center">*/}
            {/*    <Col span={14}>*/}
                    <Carousel arrows {...settings} infinite={false}>
                        <>
                            <img src={dog} alt="Stray Dog"/>
                        </>
                        <>
                            <img src={chainedDog} alt="Chained Stray Dog"/>
                        </>
                    </Carousel>
            {/*    </Col>*/}
            {/*</Row>*/}
        </div>
    )
}

export default CustomCarousel;
