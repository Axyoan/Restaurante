import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import BackButton from "../../components/backButton"
import { ColumnContainer, ColumnContainer2, RowContainer, RowContainer2} from "../../styles/core"
import { StyledTextInput, StyledCheckBox, StyledDateInput, StyledTextInput2} from '../../styles/inputs.js'
import { PasswordModal, GoBackModal } from "../../styles/modals";

Modal.setAppElement('#root');

function AddNewDish() {
    const history = useHistory();
    const [addNewDishModal, setAddNewDishModalIsOpen] = useState(false);
    const [goBackModal, setGoBackModalIsOpen] = useState(false);

    const openGoBackModal = () => {
        setGoBackModalIsOpen(true);
    };
    const closeGoBackModal = (e) => {
        setGoBackModalIsOpen(false);
        if(e) history.push('/manageD');
    };
    const openAddDishModal = () => {
        setAddNewDishModalIsOpen(true);
    };
    const closeAddDishModal = () => {
        setAddNewDishModalIsOpen(false);
        // HERE ADD THE NEW DISH C:
        history.push('/manageD');
    };

    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color ="green" onClick={openGoBackModal}/>
                <SubHeader text= "Nuevo platillo"/>
            </RowContainer2>

            <ColumnContainer2>
                {<RowContainer2>
                    {"Nombre"}
                    <StyledTextInput2/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Descipción"}
                    <StyledTextInput2/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Ingredientes"}
                    <StyledTextInput2/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Precio"}
                    <StyledTextInput2/>
                </RowContainer2>}
                {<RowContainer2>
                    {"Tipo"}
                    <StyledTextInput2/>
                </RowContainer2>}
                <Button color="orange" text="Añadir nuevo platillo"  onClick={openAddDishModal}/>
            </ColumnContainer2>

            {/*MODAL ADD NEW DISH BUTTON */}
            <Modal
                isOpen={addNewDishModal}
                onRequestClose={closeAddDishModal}
                style={PasswordModal} /*QUEDA COOL*/
            >
                <h4>
                    Platillo guardado
                    </h4>
                <ColumnContainer>
                    <Button color="green" text="Ok"  onClick={closeAddDishModal}/>
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


export default AddNewDish;