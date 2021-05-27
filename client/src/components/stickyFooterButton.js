import React from "react"
import { StyledStickyFooterButton } from "../styles/core.js"

function StickyFooterButton(props) {
    return (
        <>
            <StyledStickyFooterButton color={props.color} onClick={props.onClick}>
                {props.text}
            </StyledStickyFooterButton>
        </>
    );
}

export default StickyFooterButton;