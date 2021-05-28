import React from 'react'
import Header from '../../components/header'
import { StyledTextInput } from '../../styles/inputs.js';
import Button from '../../components/button'
import { ColumnContainer } from "../../styles/core.js";
import { useHistory } from "react-router-dom";


function Login() {
    const history = useHistory();

    const handleClick = (e) => {
        history.push('/main');
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
        </>
    );
}

export default Login