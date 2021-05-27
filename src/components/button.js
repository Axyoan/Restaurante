import React, { useImperativeHandle } from "react"
import { StyledButton } from "../styles/core.js"

function Button(props) {
    return (
        <>
            <StyledButton color={props.color} onClick={props.onClick}>
                {props.text}
            </StyledButton>
        </>
    );
}

export default Button;