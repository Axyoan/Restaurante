import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import BackButton from "../../components/backButton"
import { ColumnContainer, ColumnContainer2, RowContainer, RowContainerSB } from "../../styles/core"
import { StyledTextInput2, StyledNumberInput2, StyledTextArea } from '../../styles/inputs.js'
import { PasswordModal, GoBackModal } from "../../styles/modals";

Modal.setAppElement('#root');

function AddNewDish(props) {
    const history = useHistory();
    const [addNewDishModal, setAddNewDishModalIsOpen] = useState(false);
    const [goBackModalIsOpen, setGoBackModalIsOpen] = useState(false);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [category, setCategory] = useState(null);
    const { state: waiterId } = props.location;

    const openGoBackModal = () => {
        setGoBackModalIsOpen(true);
    };
    const closeGoBackModal = (willGoBack) => {
        setGoBackModalIsOpen(false);
        if (willGoBack) {
            history.push({ pathname: '/manageD', state: waiterId });
        }
    };

    const createDish = async () => {
        if (name && description && price && category) {
            const postRes = await axios.post(
                `${process.env.REACT_APP_API_URL}dishes/`,
                {
                    name: name,
                    description: description,
                    price: price,
                    category: category,
                }
            )
            openAddDishModal();
        }
    }

    const openAddDishModal = () => {
        setAddNewDishModalIsOpen(true);
    };
    const closeAddDishModal = () => {
        setAddNewDishModalIsOpen(false);
        // HERE ADD THE NEW DISH C:
        history.push({ pathname: '/manageD', state: waiterId });
    };


    const handleName = (e) => {
        setName(e.target.value);
    }
    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handlePrice = (e) => {
        setPrice(e.target.value);
    }
    const handleCategory = (e) => {
        setCategory(e.target.value);
    }

    return (
        <>
            <Header />
            <RowContainerSB>
                <BackButton color="green" onClick={openGoBackModal} />
                <SubHeader text="Nuevo platillo" />
            </RowContainerSB>

            <ColumnContainer2>
                {"Nombre"}
                <StyledTextInput2 onChange={handleName} />
                {"Descipción"}
                <StyledTextArea onChange={handleDescription} />
                {"Precio"}
                <StyledNumberInput2 onChange={handlePrice} />
                {"Tipo"}
                <StyledTextInput2 onChange={handleCategory} />
                <Button color="orange" text="Añadir nuevo platillo" onClick={createDish} />
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
                    <Button color="green" text="Ok" onClick={closeAddDishModal} />
                </ColumnContainer>
            </Modal>

            {/*MODAL GO BACK CONFIRMATION */}
            <Modal
                isOpen={goBackModalIsOpen}
                onRequestClose={closeGoBackModal}
                style={GoBackModal}
            >
                <h4>
                    ¿Desea salir?
                    </h4>
                <RowContainer>
                    <Button
                        color="red" text="Cancelar"
                        onClick={() => closeGoBackModal(false)}
                    />
                    <Button
                        color="green" text="Confirmar"
                        onClick={() => closeGoBackModal(true)}
                    />
                </RowContainer>
            </Modal>

        </>
    );
}


export default AddNewDish;