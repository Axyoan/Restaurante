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

function UpdateDish() {
    const history = useHistory();
    const data = history.location.state.data;
    
    const [deleteDishModal, setDeleteDishModalIsOpen] = useState(false);
    const [goBackModal, setGoBackModalIsOpen] = useState(false);

    const openGoBackModal = () => {
        setGoBackModalIsOpen(true);
    };
    const closeGoBackModal = (e) => {
        setGoBackModalIsOpen(false);
        if(e) history.push('/manageD');
    };
    const openDeleteDishModal = () => {
        setDeleteDishModalIsOpen(true); 

    };
    const closeDeleteDishModal = (e) => {
        setDeleteDishModalIsOpen(false);
        
        if(e)  history.push('/manageD');
        //DELETE DISH
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
                {<RowContainer2>
                    <Button color="orange" text="Confirmar cambios"  onClick={() => history.push('/manageD') }/>

                    <Button color="red" text="Eliminar"  onClick={() => openDeleteDishModal(false)}/>
                </RowContainer2>
                }
            </ColumnContainer2>

            {/*MODAL DELETE DISH */}
            <Modal
                isOpen={deleteDishModal}
                onRequestClose={closeDeleteDishModal}
                style={DeleteModal}
            >
                <h4>¿Seguro?</h4>
                <h4>Esta acción es permanente</h4>
                <RowContainer>
                    <Button color="red" text="Cancelar" onClick={() => closeDeleteDishModal(false)} />
                    <Button color="green" text="Confirmar" onClick={() => closeDeleteDishModal(true)}/>
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


export default UpdateDish;