import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import BackButton from "../../components/backButton"
import { ColumnContainer, ColumnContainer2, RowContainer, RowContainer2} from "../../styles/core"
import { StyledTextInput2, StyledCheckBox, StyledDateInput} from '../../styles/inputs.js'
import { PasswordModal, GoBackModal } from "../../styles/modals";

Modal.setAppElement('#root');

function AddNewWaiter() {
    const history = useHistory();
    const [addNewWaiterModal, setAddNewWaiterModalIsOpen] = useState(false);
    const [goBackModal, setGoBackModalIsOpen] = useState(false);

    const openGoBackModal = () => {
        setGoBackModalIsOpen(true);
    };
    const closeGoBackModal = (e) => {
        setGoBackModalIsOpen(false);
        if(e) history.push('/manageW');
    };
    const openAddWaiterModal = () => {
        setAddNewWaiterModalIsOpen(true);
    };
    const closeAddWaiterModal = () => {
        setAddNewWaiterModalIsOpen(false);
        history.push('/manageW');
    };

    useEffect(() => {
        console.log("I have been mounted")
    }, [])

    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color ="green" onClick={openGoBackModal}/>
                <SubHeader text= "Nuevo mesero"/>
            </RowContainer2>

            <ColumnContainer2>
                {<RowContainer2>
                    {"Nombre"}
                    <StyledTextInput2/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Apellido P"}
                    <StyledTextInput2/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Apellido M"}
                    <StyledTextInput2/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Fecha nacimiento"}
                    <StyledDateInput/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Telefono"}
                    <StyledTextInput2/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Direccion"}
                    <StyledTextInput2/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Fecha ingreso"}
                    <StyledDateInput/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Correo electronico"}
                    <StyledTextInput2/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Jefe"}
                    <StyledCheckBox/>
                </RowContainer2>}
                <Button color="orange" text="Añadir nuevo mesero"  onClick={openAddWaiterModal}/>
            </ColumnContainer2>

            {/*MODAL ADD NEW VAITER BUTTON */}
            <Modal
                isOpen={addNewWaiterModal}
                onRequestClose={closeAddWaiterModal}
                style={PasswordModal}
            >
                <h4>
                    El id y contraseña se han enviado al correo electronico del mesero.
                    </h4>
                <ColumnContainer>
                    <Button color="green" text="Ok"  onClick={closeAddWaiterModal}/>
                </ColumnContainer>

            </Modal>

            {/*MODAL GO BACK CONFIRMATION */}
            <Modal
                isOpen={goBackModal}
                onRequestClose={closeGoBackModal}
                style={GoBackModal}
            >
                <h4>
                    ¿Desea salir?
                    </h4>
                <RowContainer>
                    <Button  color="red" text="Cancelar" onClick={() =>closeGoBackModal(false)}/>
                    <Button color="green" text="Confirmar" onClick={() => closeGoBackModal(true)}/>
                </RowContainer>

            </Modal>
          
        </>
    );
}


export default AddNewWaiter;