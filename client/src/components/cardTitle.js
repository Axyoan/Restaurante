import React from "react"
import { StyledTitle } from "../styles/core.js"

function CardTitle(props) {
    return (
        <StyledTitle>
            <h4>
                {props.name}
            </h4>
            <h5>
                ${props.price}
            </h5>
        </StyledTitle>
    );
}

export default CardTitle;