import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/header';
import Button from '../components/button';
import { StyledTextInput } from '../styles/inputs.js';
import { ColumnContainer, StyledWarning } from "../styles/core.js";
import { useHistory } from "react-router-dom";

function Login() {
    const [code, setCode] = useState(null);
    const [showError, setShowError] = useState(false);
    const history = useHistory();

    const handleInput = (e) => {
        setCode(e.target.value);
        console.log(code);
    }

    const handleClick = async (e) => {
        if (!code) {
            setShowError(true);
        } else if (/^[a-zA-Z]{4}$/.test(code)) {
            ///TABLE CODE
            const realCode = code.toUpperCase();
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}tables/`, { params: { code: realCode } }
            );
            const table = res.data;
            if (table) {
                history.push({ pathname: '/main', state: realCode });
            }
            setShowError(true);
        } else if (/^[0-9]{6}$/.test(code)) {
            ///WAITER CODE
            const res = await axios.get(`${process.env.REACT_APP_API_URL}waiters/`);
            const waiters = res.data;
            console.log(waiters);
            for (const w of waiters) {
                if (code === w.code) {
                    history.push('/main');
                }
            }
        } else {
            setShowError(true);
        }
        return;
    }
    return (
        <>
            <Header />
            <ColumnContainer>
                <h2>Ingrese código</h2>
                <StyledTextInput onChange={handleInput} />
                <Button color="orange" text="Confirmar" onClick={handleClick} />
                {showError && <StyledWarning>Código incorrecto</StyledWarning>}
            </ColumnContainer>
        </>
    );
}

export default Login