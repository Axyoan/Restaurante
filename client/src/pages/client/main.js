import React, { useState, useEffect } from 'react'
import axios from 'axios';
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

function Main(props) {
    const [table, setTable] = useState({ _id: null });
    const [dishModalIsOpen, setDishModalIsOpen] = useState(false);
    const [helpModalIsOpen, setHelpModalIsOpen] = useState(false);
    const [orderModalIsOpen, setOrderModalIsOpen] = useState(false);
    const [billModalIsOpen, setBillModalIsOpen] = useState(false);
    const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
    ///dishId: null, name: "", price: null, quantity: 0 }
    const [order = null, setOrder] = useState([]);
    const [bill = null, setBill] = useState([]);
    const [dish, setDish] = useState();
    const [dishList, setDishList] = useState([]);
    const history = useHistory();
    const { state: tableCode } = props.location;

    function openDishModal(data) {
        setDishModalIsOpen(true);
        setDish({ dishId: data.dishId, name: data.name, price: data.price, quantity: 0 });
    }

    function closeDishModal(willAdd) {
        if (willAdd && dish.quantity !== null && dish.quantity !== 0) {
            let prevDish = order.find(x => x.dishId === dish.dishId)
            if (prevDish !== undefined) {
                const newOrder = [...order];
                newOrder.find(x => x.dishId === dish.dishId).quantity += dish.quantity;
                setOrder(newOrder);
                updateCurrentOrderDB(newOrder);
            }
            else {
                const newOrder = [...order, dish];
                setOrder(newOrder);
                updateCurrentOrderDB(newOrder);
            }
        }
        setDishModalIsOpen(false);
    }

    const openHelpModal = () => {
        setHelpModalIsOpen(true);
    }

    const closeHelpModal = async () => {
        ///Send notification to waiters
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}waiters/?tableId=${table._id}`);
        const assignedWaiters = res.data;
        for (const waiter of assignedWaiters) {
            await axios.patch(
                `${process.env.REACT_APP_API_URL}waiters/${waiter._id}`,
                {
                    notifications: [...waiter.notifications, {
                        category: 'ayuda',
                        tableNumber: table.number,
                        tableCode: table.code,
                        orderId: null,
                        resolved: false,
                    }]
                })
        }
        setHelpModalIsOpen(false);
    }

    const openOrderModal = () => {
        setOrderModalIsOpen(true);
    }

    const updateBillDB = async (newBill) => {
        console.log("updateBill");
        const res = await axios.patch(
            `${process.env.REACT_APP_API_URL}tables/${table._id}`,
            { bill: { dishes: newBill } }
        );
    }

    const updatePendingOrdersDB = async (newOrderId) => {
        console.log("updatePendingOrders");

        ///Construct new "orders" object
        const newPendingOrders =
            [...(table.pendingOrders ? table.pendingOrders : []), { dishes: order, orderId: newOrderId }]

        setTable(prevState => ({
            ...prevState,
            pendingOrders: newPendingOrders
        }));
        await axios.patch(
            `${process.env.REACT_APP_API_URL}tables/${table._id}`,
            { pendingOrders: newPendingOrders }
        );

        ///Notify waiters of pending orders
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}waiters/?tableId=${table._id}`);
        const assignedWaiters = res.data;
        for (const waiter of assignedWaiters) {
            await axios.patch(
                `${process.env.REACT_APP_API_URL}waiters/${waiter._id}`,
                {
                    notifications: [...waiter.notifications, {
                        category: 'orden',
                        tableNumber: table.number,
                        tableCode: table.code,
                        orderId: newOrderId,
                        resolved: false,
                    }]
                })
        }

    }
    const updateCurrentOrderDB = async (newOrder) => {
        const res = await axios.patch(
            `${process.env.REACT_APP_API_URL}tables/${table._id}`,
            { currentOrder: newOrder }
        );
    }
    const closeOrderModal = async (addToBill) => {
        if (addToBill) {
            let newBill = [...bill];
            for (let el of order) {
                const prevDish = newBill.find(x => x.dishId === el.dishId)
                if (prevDish !== undefined) {
                    prevDish.quantity += el.quantity;
                }
                else {
                    newBill = [...newBill, el];
                }
            }
            setBill(newBill);
            updateBillDB(newBill);
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}tables/${table._id}`,
            );
            updatePendingOrdersDB(res.data.currentOrder.orderId);
            updateCurrentOrderDB([]);
            setOrder([]);
        }
        setOrderModalIsOpen(false);
    }

    const openBillModal = () => {
        setBillModalIsOpen(true);
    }

    const closeBillModal = async (endSession) => {
        setBillModalIsOpen(false);
        if (endSession) {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}waiters/?tableId=${table._id}`);
            const assignedWaiters = res.data;
            console.log(bill);
            for (const waiter of assignedWaiters) {
                await axios.patch(
                    `${process.env.REACT_APP_API_URL}waiters/${waiter._id}`,
                    {
                        notifications: [...waiter.notifications, {
                            category: 'cuenta',
                            tableNumber: table.number,
                            tableCode: table.code,
                            orderId: null,
                            bill: {
                                dishes: [...bill.map(d => {
                                    return {
                                        dishId: d.dishId,
                                        name: d.name,
                                        quantity: d.quantity,
                                        price: d.price
                                    }
                                })]
                            },
                            resolved: false,
                        }]
                    })
            }
            await axios.put(
                `${process.env.REACT_APP_API_URL}tables/${table._id}`,
                {
                    code: table.code,
                    number: table.number,
                    currentOrder: null,
                    pendingOrders: null,
                    bill: null,
                    assignedWaiters: table.assignedWaiters
                }
            );
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

    function DishList() {
        return (
            <ColumnContainer>
                {dishList.map((d, i) => {
                    return (<DishCard
                        key={d.key}
                        name={d.name}
                        price={d.price}
                        description={d.description}
                        onClick={() => openDishModal({
                            name: d.name,
                            price: d.price,
                            dishId: d.key
                        })}
                    />);
                })}
            </ColumnContainer>
        );
    };

    const deleteFromOrder = (dishId) => {
        let newOrder = order;
        newOrder = newOrder.filter((d) => d.dishId !== dishId)
        setOrder(newOrder);
        updateCurrentOrderDB(newOrder);
    }

    function Order() {
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
                                <tr key={o.dishId}>
                                    <td><DeleteButton onClick={() => deleteFromOrder(o.dishId)} /></td>
                                    <td>{o.quantity}</td>
                                    <td>{o.name}</td>
                                    <td>${(parseFloat(o.price) * o.quantity).toFixed(2)}</td>
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

    function Bill() {
        console.log("Loading Bill");
        if (bill.length === 0) {
            return (
                <></>
            );
        }
        const preTotal = bill.reduce((acc, cur) => {
            return acc += parseFloat(cur.price) * parseFloat(cur.quantity);
        }, 0.0)
        let iva = preTotal * .16;
        let total = parseFloat(preTotal) + parseFloat(iva);
        iva = iva.toFixed(2);
        total = total.toFixed(2);
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
                                <tr key={o.dishId}>
                                    <td>{o.quantity}</td>
                                    <td>{o.name}</td>
                                    <td>${o.price * o.quantity}</td>
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
        const newDish = Object.assign({}, dish, { quantity: parseInt(e.target.value) });
        setDish(newDish);
    }

    const loadDishes = async () => {
        console.log("loadDishes")
        const res = await axios.get(`${process.env.REACT_APP_API_URL}dishes/`);
        const dishes = res.data;
        const newDishList = [
            ...dishes.map(d => {
                return {
                    key: d._id,
                    name: d.name,
                    price: d.price,
                    description: d.description
                }
            })
        ];
        setDishList(newDishList);
    }

    const loadTableInfo = async () => {
        console.log("loadTableInfo")
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}tables/`,
            { params: { code: tableCode } }
        );
        const tableData = res.data;
        setTable(tableData);
        if (!tableData) {
            return;
        }
        if (tableData.currentOrder) {
            const newOrder = [...tableData.currentOrder.dishes]
            setOrder(newOrder);
        }
        console.log(tableData);
        if (!tableData.bill) {
            return;
        }
        const newBill = [
            ...tableData.bill.dishes.map(d => {
                return {
                    dishId: d.dishId,
                    name: d.name,
                    price: d.price,
                    quantity: d.quantity
                }
            })
        ];
        setBill(newBill);
    }

    useEffect(() => {
        loadDishes();
        loadTableInfo();
    }, [])

    return (
        <>
            {console.log("------Rendered-----")}
            <Header />
            <RowContainer>
                {(bill.length !== 0) &&
                    <Button color="green" text="Pedir cuenta" onClick={openBillModal} />
                }
                <Button color="red" text="Necesito ayuda" onClick={openHelpModal} />
            </RowContainer>
            <StyledHr />
            <RowContainer>
                <StyledH2>Menú</StyledH2>
            </RowContainer>

            <DishList />
            {/*DISH MODAL-------------------- */}
            <Modal
                isOpen={dishModalIsOpen}
                onRequestClose={closeDishModal}
                style={DishModal}
            >
                <h4>
                    Añadir al pedido:
                </h4>
                {dish && dish.name}
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
                <Order />
            </Modal>

            {/*BILL MODAL*/}
            <Modal
                isOpen={billModalIsOpen}
                onRequestClose={closeBillModal}
                style={BillModal}
                shouldCloseOnOverlayClick={false}
            >
                <ColumnContainer>
                    <StyledH2>Cuenta</StyledH2>
                    <StyledHr widthPercentage={70} />
                    <Bill />
                    <RowContainer>
                        <Button text="Cancelar" color="red" onClick={() => closeBillModal(false)} />
                        <Button text="Pedir cuenta" color="green" onClick={() => openConfirmModal()} />
                    </RowContainer>
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


