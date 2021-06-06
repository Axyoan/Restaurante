import React from "react"
import { StyledBackButton } from "../styles/core.js"
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';

function BackButton(props) {
    return (
        <>
            <StyledBackButton onClick={props.onClick} color= {props.color}>
                <ArrowBackOutlinedIcon/> 
            </StyledBackButton>
        </>
    );
}

export default BackButton;