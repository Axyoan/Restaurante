import React from "react"
import { StyledCard } from "../styles/core.js"
import CardTitle from "./cardTitle"


function DishCard(props) {
    return (
        <StyledCard onClick={props.onClick}>
            <CardTitle name={props.name} price={props.price} />
            {props.description}
        </StyledCard>
    );
}

export default DishCard;