import React, {useState} from "react"
import { StyledSimpleCard2 } from "../styles/core.js"

function SimpleCard(props) {
    // ADD THE IMAGE(?
    return (
        <StyledSimpleCard2 color ={props.color} onClick = {props.onClick}>
            {props.text}
        </StyledSimpleCard2>
    );
}

export default SimpleCard;