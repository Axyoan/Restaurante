import React from "react"
import { StyledExitButton } from "../styles/core.js"
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

function ExitButton(props) {
    return (
        <>
            <StyledExitButton onClick={props.onClick}>
                Logout
                <ExitToAppIcon/> 
            </StyledExitButton>
        </>
    );
}

export default ExitButton;