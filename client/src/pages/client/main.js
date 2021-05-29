import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import Button from "../../components/button";
import DishCard from "../../components/dishCard"
import ScrollButton from "../../components/scrollButton"
import DeleteButton from "../../components/deleteButton"
import StickyFooterButton from '../../components/stickyFooterButton';
import { ColumnContainer, RowContainer, StyledHr, StyledH2, StyledH3, StyledTable, StyledBillTable } from "../../styles/core"
import { DishModal, HelpModal, OrderModal, BillModal, ConfirmModal } from "../../styles/modals"
import { StyledNumberInput } from '../../styles/inputs';

Modal.setAppElement('#root');

function Main() {
    const [dishModalIsOpen, setDishModalIsOpen] = useState(false);
    const [helpModalIsOpen, setHelpModalIsOpen] = useState(false);
    const [orderModalIsOpen, setOrderModalIsOpen] = useState(false);
    const [billModalIsOpen, setBillModalIsOpen] = useState(false);
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
    const [order, setOrder] = useState([]);
    const [bill, setBill] = useState([]);

    const [dish, setDish] = useState({ id: null, name: "", price: null, qty: 0 });

    const history = useHistory();

    function openDishModal(data) {
        setDishModalIsOpen(true);
        setDish({ id: data.id, name: data.name, price: data.price, qty: 0 });
    }


    function closeDishModal(willAdd) {
        if (willAdd && dish.qty !== null && dish.qty !== 0) {
            console.log("dish added")
            let prevDish = order.find(x => x.id === dish.id)

            if (prevDish !== undefined) {
                prevDish.qty += dish.qty;
            }
            else {
                const newOrder = [...order, dish];
                setOrder(newOrder);
            }
            console.log("Current order:");
            console.log(order);
        }
        else {
            console.log("canceled")
        }
        setDishModalIsOpen(false);
    }

    const openHelpModal = () => {
        setHelpModalIsOpen(true);
    }

    const closeHelpModal = () => {
        setHelpModalIsOpen(false);
    }

    const openOrderModal = () => {
        setOrderModalIsOpen(true);
    }

    const closeOrderModal = (addToBill) => {
        if (addToBill) {
            let newBill = [...bill];
            for (let el of order) {
                const prevDish = newBill.find(x => x.id === el.id)
                if (prevDish !== undefined) {
                    prevDish.qty += el.qty;
                }
                else {
                    newBill = [...newBill, el];
                }
            }
            setBill(newBill);
            setOrder([]);
        }
        setOrderModalIsOpen(false);
    }

    const openBillModal = () => {
        setBillModalIsOpen(true);
    }

    const closeBillModal = (endSession) => {
        setBillModalIsOpen(false);
        if (endSession) {
            history.push('/');
        }
    }

    const openConfirmModal = () => {
        setConfirmModalIsOpen(true);
    }

    const closeConfirmModal = () => {
        setConfirmModalIsOpen(false);
    }

    const handleScroll = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
    }

    const loadDishes = () => {
        return (
            <ColumnContainer>
                <DishCard title="Guacamole" price="50" description="Lorem ipsum"
                    onClick={() => openDishModal({ name: "Guacamole", price: 50, id: 1 })}
                />
                <DishCard title="Queso fundido" price="40" description="Lorem ipsum"
                    onClick={() => openDishModal({ name: "Queso fundido", price: 40, id: 2 })}
                />
                <DishCard title="Fetuccini" price="125" description="Lorem ipsum"
                    onClick={() => openDishModal({ name: "Fetuccini", price: 125, id: 3 })} />
            </ColumnContainer>
        );
    };

    const deleteFromOrder = (id) => {
        let newOrder = order;
        newOrder = newOrder.filter((d) => d.id !== id)
        setOrder(newOrder);
        console.log("Current order:");
        console.log(order);
    }

    const loadOrder = () => {
        console.log("loadOrder");
        if (order.length === 0) {
            return (
                <>
                    <p>Agrege platillos a su orden</p>
                    <Button color="green" text="Ok" onClick={() => closeOrderModal(false)} />
                </>
            );
        }
        return (
            <>
                <StyledTable>
                    <thead>
                        <tr>
                            <td></td>
                            <td>#</td>
                            <td>Platillo</td>
                            <td>$</td>
                        </tr>
                    </thead>
                    <tbody>
                        {order.map((o, i) => {
                            return (
                                <tr key={o.id}>
                                    <td><DeleteButton onClick={() => deleteFromOrder(o.id)} /></td>
                                    <td>{o.qty}</td>
                                    <td>{o.name}</td>
                                    <td>${(parseFloat(o.price) * o.qty).toFixed(2)}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </StyledTable>
                <RowContainer>
                    <Button text="Cancelar" color="red" onClick={() => closeOrderModal(false)} />
                    <Button text="Confirmar" color="green" onClick={() => closeOrderModal(true)} />
                </RowContainer>
            </>
        );
    }

    const loadBill = () => {
        if (bill.length === 0) {
            return (
                <></>
            );
        }
        const preTotal = bill.reduce((acc, cur) => {
            return acc += parseFloat(cur.price) * parseFloat(cur.qty);
        }, 0.0)
        let iva = preTotal * .16;
        let total = parseFloat(preTotal) + parseFloat(iva);
        iva = iva.toFixed(2);
        total.toFixed(2);
        return (
            <>
                <StyledBillTable>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>Platillo</td>
                            <td>$</td>
                        </tr>
                    </thead>
                    <tbody>
                        {bill.map((o, i) => {
                            return (
                                <tr key={o.id}>
                                    <td>{o.qty}</td>
                                    <td>{o.name}</td>
                                    <td>${o.price * o.qty}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </StyledBillTable>
                <div>
                    IVA:...
                {iva}
                </div>
                <div>
                    Total:...
                {total}
                </div>
            </>
        );
    }
    const handleNumberInput = (e) => {
        const newDish = Object.assign({}, dish, { qty: parseInt(e.target.value) });
        setDish(newDish);
        console.log(dish);
    }

    useEffect(() => {
        console.log("I have been mounted")
    }, [])

    return (
        <>
            <Header />
            <RowContainer>
                {(bill.length !== 0) ?
                    <Button color="green" text="Pedir cuenta" onClick={openBillModal} />
                    : null
                }
                <Button color="red" text="Necesito ayuda" onClick={openHelpModal} />
            </RowContainer>
            <StyledHr />
            <RowContainer>
                <StyledH2>Menú</StyledH2>
            </RowContainer>
            {loadDishes()}


            {/*DISH MODAL-------------------- */}
            <Modal
                isOpen={dishModalIsOpen}
                onRequestClose={closeDishModal}
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
                    <Button text="Cancelar" color="red" onClick={() => closeDishModal(false)} />
                    <Button text="Confirmar" color="green" onClick={() => closeDishModal(true)} />
                </RowContainer>

            </Modal>

            {/*HELP MODAL-------------------- */}
            <Modal
                isOpen={helpModalIsOpen}
                onRequestClose={closeHelpModal}
                style={HelpModal}
            >
                Un mesero va en camino
                <Button color="green" text="Ok" onClick={closeHelpModal} />
            </Modal>

            {/*ORDER MODAL-------------------- */}
            <Modal
                isOpen={orderModalIsOpen}
                onRequestClose={closeOrderModal}
                style={OrderModal}
            >
                <StyledH3>Orden</StyledH3>
                <StyledHr />
                {loadOrder()}
            </Modal>

            {/*BILL MODAL*/}
            <Modal
                isOpen={billModalIsOpen}
                onRequestClose={closeBillModal}
                style={BillModal}
            >
                <ColumnContainer>
                    <StyledH2>Cuenta</StyledH2>
                    <StyledHr widthPercentage={70} />
                    {loadBill()}
                    {
                        <RowContainer>
                            <Button text="Cancelar" color="red" onClick={() => closeBillModal(false)} />
                            <Button text="Pedir cuenta" color="green" onClick={() => openConfirmModal()} />
                        </RowContainer>
                    }
                </ColumnContainer>
                <Modal
                    isOpen={confirmModalIsOpen}
                    onRequestClose={closeConfirmModal}
                    style={ConfirmModal}
                >
                    ¿Seguro?
                    <RowContainer>
                        <Button text="Cancelar" color="red" onClick={() => closeConfirmModal()} />
                        <Button text="Confirmar" color="green" onClick={() => {
                            closeConfirmModal();
                            closeBillModal(true);
                        }} />
                    </RowContainer>
                </Modal>
            </Modal>

            <ScrollButton onClick={handleScroll} />
            <StickyFooterButton color="blue" text="Ver tu orden" onClick={openOrderModal} />
        </>
    );
}


export default Main


