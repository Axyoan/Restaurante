import React, { useState, useEffect } from 'react'
import Modal from 'react-modal';
import Header from "../../components/header";
import Button from "../../components/button";
import DishCard from "../../components/dishCard"
import ScrollButton from "../../components/scrollButton"
import StickyFooterButton from '../../components/stickyFooterButton';
import { ColumnContainer, RowContainer, StyledHr, StyledH2 } from "../../styles/core"
import { DishModal } from "../../styles/modals"
import { StyledNumberInput } from '../../styles/inputs';

Modal.setAppElement('#root');

function Main() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [dish, setDish] = useState({ name: "", price: null, id: null });
    const [quantity, setQuantity] = useState(0);

    function openModal(data) {
        setQuantity(0);
        setIsOpen(true);
        setDish({ id: data.id, name: data.name, price: data.price });
    }
    function closeModal(willAdd) {
        if (willAdd && quantity !== null && quantity !== 0) {
            console.log("dish added")
        }
        else {
            console.log("canceled")
        }
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
                    onClick={() => openModal({ name: "Guacamole", price: 50, id: 1 })}
                />
                <DishCard title="Queso fundido" price="40" description="Lorem ipsum"
                    onClick={() => openModal({ name: "Queso fundido", price: 40, id: 2 })}
                />
                <DishCard title="Fetuccini" price="125" description="Lorem ipsum"
                    onClick={() => openModal({ name: "Fetuccini", price: 125, id: 3 })} />
            </ColumnContainer>
        );
    };

    const handleNumberInput = (e) => {
        setQuantity(e.target.value);
        console.log(quantity);
    }

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
                onRequestClose={closeModal}
                style={DishModal}
            >
                <h4>
                    Añadir al pedido:
                    </h4>
                {dish.name}
                <StyledHr />
                <RowContainer>
                    Cantidad:
                    <StyledNumberInput onChange={handleNumberInput} />
                </RowContainer>
                <RowContainer>
                    <Button text="Cancelar" color="red" onClick={() => closeModal(false)}></Button>
                    <Button text="Confirmar" color="green" onClick={() => closeModal(true)}></Button>
                </RowContainer>

            </Modal>
            <ScrollButton onClick={handleScroll}>scroll up</ScrollButton>
            <StickyFooterButton color="blue" text="Ordenar" />
        </>
    );
}


export default Main


