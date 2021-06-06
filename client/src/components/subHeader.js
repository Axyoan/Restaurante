import React from "react"
import { StyledSubHeader } from "../styles/core.js";

function SubHeader(props) {
    return (
        <StyledSubHeader >
            <header>
                <h1>
                    {props.text}
                </h1>
            </header>
        </StyledSubHeader>
    );
}

export default SubHeader;