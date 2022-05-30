import React from "react"
import {Link} from "react-router-dom";
import "./style.scss"

const TwoColouredButton = ({primaryColor, secondaryColor, linkTo, text, textColor, src = ""}) => {
    return (
        <>
            <Link to={{ pathname: linkTo }}
                  // target="_blank"
            >
            <button className="two-coloured-button"
                        style={{
                            backgroundColor: primaryColor,
                            color: textColor,
                            boxShadow: `60px 0 ${secondaryColor}`
                        }}>
                    {text}
                    <img src={src}/>
                </button>
            </Link>
        </>
    )
}

export default TwoColouredButton;
