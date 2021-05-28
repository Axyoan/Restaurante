import styled from "styled-components"

export const StyledTextInput = styled.input.attrs({
    type: "text"
})`
    border-radius: 15px;
    margin-bottom: 25px;
    width: 80%
`
export const StyledNumberInput = styled.input.attrs({
    type: "number",
    min: 1,
    max: 10,
})`
    width: 65px;
    height: 32px;
    border: 0.5px solid #000000;
    box-sizing: border-box;
    box-shadow: inset 2px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 3px;
`

