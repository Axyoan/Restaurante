import React from "react"
import { StyledSquareColor } from "../styles/core.js"

function SquareColor(props) {
    return (
        <>
            <StyledSquareColor color={props.color} onClick={props.onClick}>
            </StyledSquareColor>
        </>
    );
}

export default SquareColor;