import styled from "styled-components"

export const StyledTextInput = styled.input.attrs({
    type: "text"
})`
    border-radius: 15px;
    margin-bottom: 25px;
    width: 80%
`

export const StyledPassTextInput = styled.input.attrs({
    type: "password"
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
export const StyledSearchTextInput = styled.input.attrs({
    type: "text"
})`
    margin-top: 25px;
    border-radius: 15px;
    margin-bottom: 25px;
    width: 100%
`
export const StyledDateInput = styled.input.attrs({
    type: "date"
})`
    width: 230px;
    font-size: 16px;
`

export const StyledCheckBox = styled.input.attrs({
    type: "checkbox"
})`
    width: 45px;
    height: 20px;
    cursor: pointer;
`

export const StyledSelectBox = styled.select`
    width: 100px;
    height: 20px;
    font-size: 15px;
    option {
        font-size: 15px;
        background: white;
        font-weight: small;
        display: flex;
        white-space: pre;
        
      }
`
export const StyledTextInput2 = styled.input.attrs({
    type: "text"
})`
    width: 80%;
    font-size: 16px;
`