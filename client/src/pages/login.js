import React, {useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Header from '../components/header';
import { StyledTextInput, StyledPassTextInput } from '../styles/inputs.js';
import Button from '../components/button';
import { ColumnContainer, StyledHr, StyledWarning } from "../styles/core.js";
import { useHistory } from "react-router-dom";
import { PasswordModal } from "../styles/modals";

function Login() {
    const [code, setCode] = useState(null);
    const [showError, setShowError] = useState(false);
    const history = useHistory();
    const [waiterPassModalIsOpen, setWaiterPassModalIsOpen] = useState(false);



    const closeModalPass = () => {
        
        //correct password
        history.push('/mainW');

        /* incorrect password
        
         show something saying tas pendejo. */
         setWaiterPassModalIsOpen(false);
    }

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
                    setWaiterPassModalIsOpen(true);
                    //history.push('/main');
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
                    <StyledPassTextInput />
                    <Button color="orange" text="Iniciar sesión" onClick={closeModalPass} />
                </ColumnContainer>

            </Modal>
        </>
    );
}

export default Login