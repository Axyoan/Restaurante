import React from "react"
import { StyledTitle } from "../styles/core.js"

function CardTitle(props) {
    return (
        <StyledTitle>
            <h4>
                {props.title}
            </h4>
            <h4>
                ${props.price}
            </h4>
        </StyledTitle>
    );
}

export default CardTitle;