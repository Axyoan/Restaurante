import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import BackButton from "../../components/backButton"
import { ColumnContainer2, RowContainer, RowContainer2} from "../../styles/core"
import { StyledTextInput, StyledCheckBox, StyledDateInput, StyledTextInput2} from '../../styles/inputs.js'
import { PasswordModal, GoBackModal, DeleteModal } from "../../styles/modals";

Modal.setAppElement('#root');

function UpdateWaiter() {
    const history = useHistory();
    const data = history.location.state.data;
    
    const [deleteWaiterModal, setDeleteWaiterModalIsOpen] = useState(false);
    const [goBackModal, setGoBackModalIsOpen] = useState(false);

    const openGoBackModal = () => {
        setGoBackModalIsOpen(true);
    };
    const closeGoBackModal = (e) => {
        setGoBackModalIsOpen(false);
        if(e) history.push('/manageW');
    };
    const openDeleteWaiterModal = () => {
        setDeleteWaiterModalIsOpen(true);
    };
    const closeDeleteWaiterModal = (e) => {
        setDeleteWaiterModalIsOpen(false);
        if(e)  history.push('/manageW');
    };

    useEffect(() => {
        console.log("I have been mounted")
    }, [])

    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color ="green" onClick={openGoBackModal}/>
                <SubHeader text={data}/>
            </RowContainer2>

            <ColumnContainer2>
                {<RowContainer2>
                    {"Nombre(s)"}
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
                {<RowContainer2>
                    <Button color="orange" text="Confirmar cambios"  onClick={() => history.push('/manageW') }/>
                    <Button color="red" text="Eliminar"  onClick={() => openDeleteWaiterModal(false)}/>
                </RowContainer2>
                }
            </ColumnContainer2>

            {/*MODAL DELETE VAITER */}
            <Modal
                isOpen={deleteWaiterModal}
                onRequestClose={closeDeleteWaiterModal}
                style={DeleteModal}
            >
                <h4>¿Seguro?</h4>
                <h4>Esta acción es permanente</h4>
                <RowContainer>
                    <Button color="red" text="Cancelar" onClick={() => closeDeleteWaiterModal(false)} />
                    <Button color="green" text="Confirmar" onClick={() => closeDeleteWaiterModal(true)}/>
                </RowContainer>

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


export default UpdateWaiter;