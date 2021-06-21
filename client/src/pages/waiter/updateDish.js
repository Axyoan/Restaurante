import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import BackButton from "../../components/backButton"
import { ColumnContainer2, RowContainer, RowContainer2, RowContainerSB } from "../../styles/core"
import { StyledTextArea, StyledTextInput2, StyledNumberInput2 } from '../../styles/inputs.js'
import { PasswordModal, DeleteModal } from "../../styles/modals";

Modal.setAppElement('#root');

function UpdateDish() {
    const history = useHistory();
    const data = history.location.state;
    const waiterId = history.location.state.waiterId;
    const [deleteDishModal, setDeleteDishModalIsOpen] = useState(false);
    const [name, setName] = useState(null);
    const [description, setDescription] = useState(null);
    const [price, setPrice] = useState(null);
    const [category, setCategory] = useState(null);

    const openDeleteDishModal = () => {
        setDeleteDishModalIsOpen(true);

    };
    const closeDeleteDishModal = async (willDelete) => {
        setDeleteDishModalIsOpen(false);
        if (willDelete) {
            await axios.delete(
                `${process.env.REACT_APP_API_URL}dishes/${data.key}`);

            history.push({ pathname: '/manageD', state: waiterId });
        }
    };

    const updateDish = async () => {
        if (name && description && price && category) {
            const postRes = await axios.put(
                `${process.env.REACT_APP_API_URL}dishes/${data.key}`,
                {
                    name: name,
                    descfription: description,
                    price: price,
                    category: category,
                }
            )
            history.push({ pathname: '/manageD', state: waiterId })
        }
    }

    useEffect(() => {
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCategory(data.category);
        console.log("I have been mounted")
    }, [])

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
            <RowContainer2>
                <BackButton color="green" onClick={() => { return history.push({ pathname: '/manageD', state: waiterId }) }} />
                <SubHeader text={data.name} />
            </RowContainer2>

            <ColumnContainer2>
                {"Nombre"}
                <StyledTextInput2 defaultValue={data.name} onChange={handleName} />
                {"Descipción"}
                <StyledTextArea defaultValue={data.description} onChange={handleDescription} />
                {"Precio"}
                <StyledNumberInput2 defaultValue={data.price} onChange={handlePrice} />
                {"Tipo"}
                <StyledTextInput2 defaultValue={data.category} onChange={handleCategory} />
                <RowContainerSB>
                    <Button
                        color="green" text="Confirmar cambios"
                        onClick={updateDish} />
                    <Button
                        color="red" text="Eliminar"
                        onClick={() => openDeleteDishModal(false)} />
                </RowContainerSB>
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
                    <Button color="green" text="Confirmar" onClick={() => closeDeleteDishModal(true)} />
                </RowContainer>

            </Modal>

        </>
    );
}


export default UpdateDish;