import React, {useState} from 'react'
import Modal from 'react-modal';
import Header from '../components/header'
import { StyledTextInput, StyledPassTextInput } from '../styles/inputs.js';
import Button from '../components/button'
import { ColumnContainer, StyledHr } from "../styles/core.js";
import { useHistory } from "react-router-dom";
import { PasswordModal } from "../styles/modals";

function Login() {
    const history = useHistory();
    const [waiterPassModalIsOpen, setWaiterPassModalIsOpen] = useState(false);

    const handleClick = (e) => {
        //validate code if its from a table
        //history.push('/main');

        //if its a waiter's code:
        setWaiterPassModalIsOpen(true);
        
        
    }

    const closeModalPass = () => {
        
        
        //correct password
        history.push('/mainW');

        /* incorrect password
        
         show something saying tas pendejo. */
         setWaiterPassModalIsOpen(false);
    }

    /*
        TEST FOR CONNECTING TO BACKEND

        const [msg, setMsg] = React.useState("null")
    
        async function getMsg() {
            const response = await fetch("http://localhost:3001/test");
            const json = await response.json();
            console.log(json);
            setMsg(json.msg);
        };
    */
    return (
        <>
            <Header />
            <ColumnContainer>
                <h2>Ingrese código</h2>
                <StyledTextInput />
                <Button color="orange" text="Confirmar" onClick={handleClick} />
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