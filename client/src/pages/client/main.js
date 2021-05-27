import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import Header from "../../components/header";
import Button from "../../components/button";
import DishCard from "../../components/dishCard"
import ScrollButton from "../../components/scrollButton"
import { ColumnContainer, RowContainer, StyledHr, StyledH2 } from "../../styles/core"
import StickyFooterButton from '../../components/stickyFooterButton';

Modal.setAppElement('#root');

function Main() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [dishName, setDishName] = useState("");

    function openModal(data) {
        setIsOpen(true);
        setDishName(data);
    }
    function afterOpenModal() {

    }

    function closeModal() {
        setIsOpen(false);
    }

    const handleScroll = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
    }

    const loadDishes = () => {
        console.log("loadDishes")
        return (
            <ColumnContainer>
                <DishCard title="Guacamole" price="50" description="Lorem ipsum"
                    onClick={() => openModal(1)}
                />
                <DishCard title="Queso fundido" price="40" description="Lorem ipsum"
                    onClick={() => openModal(2)}
                />
                <DishCard title="Fetuccini" price="125" description="Lorem ipsum"
                    onClick={() => openModal(3)} />
            </ColumnContainer >
        );
    };

    useEffect(() => {
        console.log("I have been mounted")

    }, [])

    return (
        <>
            <Header />
            <RowContainer>
                <Button color="green" text="Pedir cuenta" />
                <Button color="red" text="Necesito ayuda" />
            </RowContainer>
            <StyledHr />
            <RowContainer>
                <StyledH2>Menú</StyledH2>
            </RowContainer>
            {loadDishes()}

            <Modal isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}>
                {dishName}
            </Modal>
            <ScrollButton onClick={handleScroll}>scroll up</ScrollButton>
            <StickyFooterButton color="blue" text="Ordenar" />
        </>
    );
}


export default Main


