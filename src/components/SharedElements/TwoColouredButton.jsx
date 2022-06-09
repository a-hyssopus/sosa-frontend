import React from "react"
import "./style.scss"
import {Link} from "react-router-dom";

const TwoColouredButton = ({
                               primaryColor,
                               secondaryColor,
                               linkTo = "",
                               text,
                               textColor = {r: 255, g: 255, b: 255, a: 1},
                               src = "",
                               donate = false
                           }) => {
    const buttonReadLayout = () => (
        <button className="two-coloured-button"
                style={{
                    backgroundColor: `rgba(${primaryColor?.r}, ${primaryColor?.g}, ${primaryColor?.b}, ${primaryColor?.a})`,
                    color: `rgba(${textColor?.r}, ${textColor?.g}, ${textColor?.b}, ${textColor?.a})`,
                    boxShadow: `60px 0 rgba(${secondaryColor?.r}, ${secondaryColor?.g}, ${secondaryColor?.b}, ${secondaryColor?.a})`,
                    fontStyle: donate ? "italic" : "",
                    marginBottom: donate ? "30px" : "",
                    width: donate ? "195px" : "",
                    paddingInline: donate ? "40px" : "",
                    paddingBlock: donate ? "10px" : ""
                }}>
            {text}
            <img src={src}/>
        </button>
    )

    return (
        <>
            {donate ? <a href={linkTo} target="_blank">
                {buttonReadLayout()}
            </a> : <Link to={{pathname: linkTo}}>
                {buttonReadLayout()}
            </Link> }
        </>
    )
}

export default TwoColouredButton;
