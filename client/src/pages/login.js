import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Header from '../components/header';
import { StyledTextInput, StyledPassTextInput } from '../styles/inputs.js';
import Button from '../components/button';
import { ColumnContainer, RowContainer, StyledWarning } from "../styles/core.js";
import { useHistory } from "react-router-dom";
import { PasswordModal } from "../styles/modals";

function Login() {
    const [id, setId] = useState(null)
    const [code, setCode] = useState(null);
    const [pass, setPass] = useState(null);
    const [showError, setShowError] = useState(false);
    const [showPassError, setShowPassError] = useState(false);
    const [waiterPassModalIsOpen, setWaiterPassModalIsOpen] = useState(false);
    const history = useHistory();



    const closeModalPass = () => {
        setWaiterPassModalIsOpen(false);
    }

    const loginWaiter = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}waiters/${id}`);
        const waiter = res.data;
        if (waiter.password === pass) {
            history.push({ pathname: '/mainW', state: id });
        }
        setShowPassError(true);
    }

    const handleInput = (e) => {
        setCode(e.target.value);
        console.log(code);
    }

    const handlePass = (e) => {
        setPass(e.target.value);
        console.log(pass);
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
                    setId(w._id);
                    setWaiterPassModalIsOpen(true);
                }
            }
        } else {
            setShowError(true);
        }
        return;
    }
    return (
        <>
            {console.log("RENDERED")}
            <Header />
            <ColumnContainer>
                <h2>Ingrese código</h2>
                <StyledTextInput onChange={handleInput} />
                <Button color="orange" text="Confirmar" onClick={handleClick} />
                {showError && <StyledWarning>Código incorrecto</StyledWarning>}
            </ColumnContainer>


            {/*WAITER'S PASSWORD MODAL-------------------- */}
            <Modal
                isOpen={waiterPassModalIsOpen}
                onRequestClose={closeModalPass}
                style={PasswordModal}
            >
                <h4>
                    Ingrese contraseña:
                    </h4>
                <ColumnContainer>
                    <StyledPassTextInput onChange={handlePass} />
                    <RowContainer>
                        <Button color="red" text="Cancelar" onClick={closeModalPass} />
                        <Button color="orange" text="Iniciar sesión" onClick={loginWaiter} />
                    </RowContainer>
                    {showPassError && <StyledWarning>Contraseña incorrecta</StyledWarning>}
                </ColumnContainer>

            </Modal>
        </>
    );
}

export default Login