import React from 'react'
import Header from '../components/header'
import { StyledTextInput } from '../styles/inputs.js';
import Button from '../components/button'
import { ColumnContainer } from "../styles/core.js";
import { useHistory } from "react-router-dom";

function Login() {
    const history = useHistory();

    const handleClick = (e) => {
        history.push('/main');
    }
    return (
        <>
            <Header />
            <ColumnContainer>
                <h2>Ingrese código</h2>
                <StyledTextInput />
                <Button color="orange" text="Confirmar" onClick={handleClick} />
            </ColumnContainer>
        </>
    );
}

export default Login