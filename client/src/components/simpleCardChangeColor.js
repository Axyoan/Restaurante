import React, { useEffect, useState } from "react"
import { StyledSimpleCard } from "../styles/core.js"

function SimpleCardChangeColor(props) {
    const [actColor, setActColor] = useState("#fff");
    useEffect(() => {
        setActColor(props.color);
        console.log(props.text);
        console.log(props.color);
    }, [])

    return (
        <StyledSimpleCard color={actColor}
            onClick={() => {
                setActColor(props.changeColor);
                props.onClick();
            }}
        >
            {props.text}
        </StyledSimpleCard>
    );

}

export default SimpleCardChangeColor;