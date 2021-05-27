import React from 'react'
import Header from '../../components/header'
import { StyledTextInput } from '../../components/textInput.js';
import Button from '../../components/button'
import { StyledContainer } from "../../styles/core.js";
import { useHistory } from "react-router-dom";


function Login() {
    const history = useHistory();

    const handleClick = (e) => {
        history.push('/main');
    }

    return (
        <>
            <Header />
            <StyledContainer>
                <h2>Ingrese código</h2>
                <StyledTextInput />
                <Button color="orange" text="Confirmar" onClick={handleClick} />
            </StyledContainer>
        </>
    );
}

export default Login