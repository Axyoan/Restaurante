import React from "react"
import { StyledCard } from "../styles/core.js"
import CardTitle from "./cardTitle"


function DishCard(props) {
    return (
        <StyledCard onClick={props.onClick}>
            <CardTitle title={props.title} price={props.price}></CardTitle>
            {props.description}
        </StyledCard>
    );
}

export default DishCard;