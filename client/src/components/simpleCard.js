import React, {useState} from "react"
import { StyledSimpleCard } from "../styles/core.js"

function SimpleCard(props) {
    // ADD THE IMAGE(?
    return (
        <StyledSimpleCard color ={props.color} onClick = {props.onClick}>
            {props.text}
        </StyledSimpleCard>
    );
}

export default SimpleCard;