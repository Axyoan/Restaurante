import React from "react"
import { StyledScrollButton } from "../styles/core.js"
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

function ScrollButton(props) {
    return (
        <>
            <StyledScrollButton onClick={props.onClick}>
                <ArrowUpwardIcon />
                Volver
            </StyledScrollButton>
        </>
    );
}

export default ScrollButton;