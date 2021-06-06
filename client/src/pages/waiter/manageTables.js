import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import SimpleCardTable from "../../components/simpleCardTable";
import BackButton from "../../components/backButton"
import { ColumnContainer, RowContainer, RowContainer2,ColumnContainer2, StyledSimpleCard2, StyledH3, StyledHr, StyledGridContainer} from "../../styles/core"
import { StyledSearchTextInput, StyledSelectBox, StyledTextInput2} from '../../styles/inputs.js'
import { NotificationsModal, NewTableModal} from '../../styles/modals'

Modal.setAppElement('#root');

function ManageTables() {
    const history = useHistory();
    const [newTableModal, setNewTableModalIsOpen] =useState(false);
    const [updateTableModal, setUpdateTableModalIsOpen] =useState(false);

    const openNewTableModal = () => {
        setNewTableModalIsOpen(true);
    }
    const closeNewTableModal = () => {
        setNewTableModalIsOpen(false);
    }

    const openUpdateTableModal = () => {
        setUpdateTableModalIsOpen(true);
    }
    const closeUpdateTableModal = () => {
        setUpdateTableModalIsOpen(false);
    }

    const loadTables = () => {
        return (
            /*   */
            <>
                <StyledGridContainer inline={true} columns= {3}>
                    <SimpleCardTable text="1" color = "blue" onClick = {openUpdateTableModal} />
                    <SimpleCardTable text="2" color = "red" onClick = {openUpdateTableModal} />
                    <SimpleCardTable text="3" color = "green" onClick = {openUpdateTableModal} />
                    <SimpleCardTable text="4" color = "blue" onClick = {openUpdateTableModal} />
                    
                </StyledGridContainer>
            </>
         
        );
    }

    const addNewTable = () =>{
        return (
            /* Numero y seccion */
            <>
                <ColumnContainer2>
                    <RowContainer>
                        Sección: 
                        <StyledSelectBox>
                            <option value="" hidden> color...</option>
                            <option value="red"> rojo</option>
                            <option value="yellow">amarillo</option>
                            <option value="green">verde</option>
                            <option value="blue">azul</option>
                            <option value="orange">naranja</option>
                        </StyledSelectBox>

                    </RowContainer>
                    <RowContainer>
                        Número:
                        <StyledTextInput2/>
                    </RowContainer>
                </ColumnContainer2>
            </>
         
        );
    }
    const updateTable = () =>{
        return (
            /* Numero y seccion */
            <>
                <ColumnContainer2>
                    <RowContainer>
                        Sección: 
                        <StyledSelectBox>
                            <option value="" hidden> color...</option> {/*CHANGE THIS FOR THE CURRENT SECTION OF THE TABLE */}
                            <option value="red"> rojo</option>
                            <option value="yellow">amarillo</option>
                            <option value="green">verde</option>
                            <option value="blue">azul</option>
                            <option value="orange">naranja</option>
                        </StyledSelectBox>

                    </RowContainer>
                    <RowContainer>
                        Número:
                        <StyledTextInput2/> {/*CHANGE THIS FOR THE CURRENT NUMBER OF THE TABLE */}
                    </RowContainer>
                </ColumnContainer2>
            </>         
        );

    }
    const deleteTable = () => {
        closeUpdateTableModal();
        
    }

    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color ="green" onClick={()=>{history.push('/mainW')}}/>
                <SubHeader text= "Administrar mesas"/>
            </RowContainer2>

            <ColumnContainer>
                <Button text= "Añadir nueva mesa" color="orange" onClick={openNewTableModal}/>
                {
                    <RowContainer2>
                        <StyledSearchTextInput />

                        <Button text= "Buscar" color="orange"/>
                    </RowContainer2>

                }
                {loadTables()}
            </ColumnContainer>
          
            {/*ADD NEW TABLE  <DONE>*/}
            <Modal
                isOpen={newTableModal}
                onRequestClose={closeNewTableModal}
                style={NewTableModal} 
            >
                <StyledH3> Nueva mesa: </StyledH3>
                <StyledHr/>
                {addNewTable()}
                <RowContainer>
                    <Button color="red" text="Cancelar" onClick={closeNewTableModal}/>
                    <Button color="green" text="Guardar" onClick={closeNewTableModal}/>
                </RowContainer>
            </Modal>


            {/* UPDATE TABLE <DONE>*/}
            <Modal
                isOpen={updateTableModal}
                onRequestClose={closeUpdateTableModal}
                style={NewTableModal}
            >
                <StyledH3> Modificar mesa: </StyledH3>
                <StyledHr/>
                {updateTable()}

        
                <RowContainer>
                    <Button color="green" text="Confirmar" onClick={() => closeUpdateTableModal()}/>
                    <Button  color="red" text="Eliminar" onClick={() =>closeUpdateTableModal()}/>
                </RowContainer>

            </Modal>
        </>
    );
}


export default ManageTables