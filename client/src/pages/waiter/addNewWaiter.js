import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import BackButton from "../../components/backButton"
import { ColumnContainer, ColumnContainer2, RowContainer, RowContainer2 } from "../../styles/core"
import { StyledTextInput2, StyledCheckBox, StyledDateInput } from '../../styles/inputs.js'
import { PasswordModal, GoBackModal } from "../../styles/modals";

Modal.setAppElement('#root');

function AddNewWaiter(props) {
    const history = useHistory();
    const [addNewWaiterModal, setAddNewWaiterModalIsOpen] = useState(false);
    const { state: waiterId } = props.location;

    const [firstName, setFirstName] = useState(null);
    const [paternalLastName, setPaternalLastName] = useState(null);
    const [maternalLastName, setMaternalLastName] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [email, setEmail] = useState(null);
    const [isHeadWaiter, setIsHeadWaiter] = useState(false);

    const openAddWaiterModal = () => {
        setAddNewWaiterModalIsOpen(true);
    };
    const closeAddWaiterModal = () => {
        setAddNewWaiterModalIsOpen(false);
        history.push({ pathname: '/manageW', state: waiterId });
    };

    useEffect(() => {
        console.log("I have been mounted")
    }, [])


    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const handlePaternalLastName = (e) => {
        setPaternalLastName(e.target.value)
    }
    const handleMaternalLastName = (e) => {
        setMaternalLastName(e.target.value)
    }
    const handleBirthDate = (e) => {
        setBirthDate(e.target.value)
    }
    const handlePhone = (e) => {
        setPhone(e.target.value)
    }
    const handleAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleStartDate = (e) => {
        setStartDate(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleIsHeadWaiter = (e) => {
        setIsHeadWaiter(e.target.checked)
    }

    const validateFields = () => {
        if (firstName === null || paternalLastName === null || maternalLastName === null || birthDate === null || phone === null || address === null || startDate === null || email === null || isHeadWaiter === null) {
            return false;
        }

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!re.test(email)) {
            return false;
        }
        re = /^(\d(-?)){9}\d$/;
        if (!re.test(phone)) {
            return false;
        }
        return true;
    }
    const createWaiter = async () => {
        if (!validateFields()) {
            console.log("Datos erroneos")
            return;
        }
        const postRes = await axios.post(
            `${process.env.REACT_APP_API_URL}waiters/`,
            {
                name: {
                    firstName: firstName,
                    paternalLastName: paternalLastName,
                    maternalLastName: maternalLastName
                },
                isHeadWaiter: isHeadWaiter,
                birthDate: birthDate,
                startDate: startDate,
                address: address,
                phone: phone,
                email: email
            }
        )
        openAddWaiterModal();
    }



    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color="green" onClick={() => {
                    return history.push({ pathname: '/manageW', state: waiterId });
                }} />
                <SubHeader text="Nuevo mesero" />
            </RowContainer2>

            <ColumnContainer2>
                {"Nombre"}
                <StyledTextInput2 onChange={handleFirstName} />
                {"Apellido P"}
                <StyledTextInput2 onChange={handlePaternalLastName} />
                {"Apellido M"}
                <StyledTextInput2 onChange={handleMaternalLastName} />
                {"Fecha nacimiento"}
                <StyledDateInput onChange={handleBirthDate} />
                {"Telefono"}
                <StyledTextInput2 onChange={handlePhone} />
                {"Direccion"}
                <StyledTextInput2 onChange={handleAddress} />
                {"Fecha ingreso"}
                <StyledDateInput onChange={handleStartDate} />
                {"Correo electronico"}
                <StyledTextInput2 onChange={handleEmail} />
                {"Jefe"}
                <StyledCheckBox onChange={handleIsHeadWaiter} />
                <Button color="orange" text="Añadir nuevo mesero" onClick={createWaiter} />
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
                    <Button color="green" text="Ok" onClick={closeAddWaiterModal} />
                </ColumnContainer>

            </Modal>

        </>
    );
}


export default AddNewWaiter;