import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import BackButton from "../../components/backButton"
import { ColumnContainer2, RowContainer, RowContainer2 } from "../../styles/core"
import { StyledTextInput, StyledCheckBox, StyledDateInput, StyledTextInput2 } from '../../styles/inputs.js'
import { PasswordModal, GoBackModal, DeleteModal } from "../../styles/modals";

Modal.setAppElement('#root');

function UpdateWaiter() {
    const history = useHistory();
    const data = history.location.state.data;
    const waiterId = history.location.state.waiterId;

    const [deleteWaiterModal, setDeleteWaiterModalIsOpen] = useState(false);

    const [firstName, setFirstName] = useState(null);
    const [paternalLastName, setPaternalLastName] = useState(null);
    const [maternalLastName, setMaternalLastName] = useState(null);
    const [birthDate, setBirthDate] = useState(null);
    const [phone, setPhone] = useState(null);
    const [address, setAddress] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [email, setEmail] = useState(null);
    const [isHeadWaiter, setIsHeadWaiter] = useState(false);


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

    const openDeleteWaiterModal = () => {
        setDeleteWaiterModalIsOpen(true);
    };
    const closeDeleteWaiterModal = async (willDelete) => {
        setDeleteWaiterModalIsOpen(false);
        if (willDelete) {
            await axios.delete(
                `${process.env.REACT_APP_API_URL}waiters/${data.id}`);
            history.push({ pathname: '/manageW', state: waiterId });
        }
    };

    useEffect(() => {
        console.log("I have been mounted")
        console.log(data);
        setFirstName(data.name.firstName);
        setPaternalLastName(data.name.paternalLastName);
        setMaternalLastName(data.name.maternalLastName);
        setBirthDate(data.birthDate);
        setPhone(data.phone);
        setAddress(data.address);
        setStartDate(data.startDate);
        setEmail(data.email);
        setIsHeadWaiter(data.isHeadWaiter);
    }, [])

    const validateFields = () => {
        if (!(firstName && paternalLastName && maternalLastName && birthDate && phone && address && startDate && email && isHeadWaiter)) {
            return false;
        }
        console.log("hi");
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
    const updateWaiter = async () => {
        if (!validateFields()) {
            return;
        }
        const postRes = await axios.put(
            `${process.env.REACT_APP_API_URL}waiters/${data.id}`,
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
        history.push({
            pathname: '/manageW', state: waiterId
        })
    }

    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color="green" onClick={() => {
                    return history.push({ pathname: '/manageW', state: waiterId });
                }} />
                <SubHeader text={data.name.firstName + " " + data.name.paternalLastName} />
            </RowContainer2>

            <ColumnContainer2>
                {"Nombre"}
                <StyledTextInput2
                    onChange={handleFirstName}
                    defaultValue={data.name.firstName} />
                {"Apellido P"}
                <StyledTextInput2
                    onChange={handlePaternalLastName}
                    defaultValue={data.name.paternalLastName} />
                {"Apellido M"}
                <StyledTextInput2
                    onChange={handleMaternalLastName}
                    defaultValue={data.name.maternalLastName} />
                {"Fecha nacimiento"}
                <StyledDateInput
                    onChange={handleBirthDate}
                    defaultValue={data.birthDate.substr(0, 10)} />
                {"Telefono"}
                <StyledTextInput2
                    onChange={handlePhone}
                    defaultValue={data.phone} />
                {"Direccion"}
                <StyledTextInput2
                    onChange={handleAddress}
                    defaultValue={data.address} />
                {"Fecha ingreso"}
                <StyledDateInput
                    onChange={handleStartDate}
                    defaultValue={data.startDate.substr(0, 10)} />
                {"Correo electronico"}
                <StyledTextInput2
                    onChange={handleEmail}
                    defaultValue={data.email} />
                {"Jefe"}
                <StyledCheckBox
                    onChange={handleIsHeadWaiter}
                    defaultChecked={data.isHeadWaiter} />
                {<RowContainer2>
                    <Button color="orange" text="Confirmar cambios"
                        onClick={updateWaiter} />
                    <Button color="red" text="Eliminar"
                        onClick={() => openDeleteWaiterModal(false)} />
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
                    <Button color="red" text="Cancelar"
                        onClick={() => closeDeleteWaiterModal(false)} />
                    <Button color="green" text="Confirmar"
                        onClick={() => closeDeleteWaiterModal(true)} />
                </RowContainer>

            </Modal>

        </>
    );
}


export default UpdateWaiter;