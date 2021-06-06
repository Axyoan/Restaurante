import React, {useState} from "react"
import { StyledSimpleCard } from "../styles/core.js"

function SimpleCardChangeColor(props) {
    const [actColor, setActColor] = useState("#FFFFF");
    const bnClick = (ef) => {
        setActColor(ef);
        //console.log(ef);
    };
    // ADD THE IMAGE(?

    return (
        <>{console.log("un mensaje") }
        <StyledSimpleCard color ={actColor} onClick ={() =>bnClick(props.changeColor)}>
            {props.text}
        </StyledSimpleCard>
        </>
    );

}

export default SimpleCardChangeColor;