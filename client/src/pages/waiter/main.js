import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import Button from "../../components/button";
import NotificationButton from "../../components/notificationButton"
import DeleteButton from "../../components/deleteButton"
import ExitButton from "../../components/ExitButton"
import NotiCard from "../../components/notiCard"
import { ColumnContainer2, RowContainer, RowContainer2, StyledHr, StyledH3, StyledTableNotis, StyledTable } from "../../styles/core"
import { NotificationsModal, OrderModal } from "../../styles/modals"


Modal.setAppElement('#root');

function Main(props) {
    const history = useHistory();
    const [NotifiModal, setNotificationlIsOpen] = useState(false);
    const [isHeadWaiter, setIsHeadWaiter] = useState(false);
    const [yourTablesModal, setYourTablesModallIsOpen] = useState(false);
    const [orderDetailsModal, setOrderDetailsModallIsOpen] = useState(false);
    const [billModalIsOpen, setBillModalIsOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [tables, setTables] = useState([]);
    const [assignedTables, setAssignedTables] = useState([]);
    const [currentOrderId, setCurrentOrderId] = useState(false);
    const [bill, setBill] = useState(null);
    const { state: waiterId } = props.location;

    const openNotificationModal = async () => {
        console.log(waiterId);
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}waiters/${waiterId}`);
        const waiterData = res.data;
        setNotifications(waiterData.notifications);
        setNotificationlIsOpen(true);
    }
    const closeNotificationModal = () => {
        setNotificationlIsOpen(false);
    }
    const openYourTablesModal = () => {
        setYourTablesModallIsOpen(true);
    }

    const closeYourTablesModal = () => {
        setYourTablesModallIsOpen(false);
    }

    const openBillModal = (billInfo) => {
        setBill(billInfo);
        setBillModalIsOpen(true);
    }

    const closeBillModal = () => {
        setBillModalIsOpen(false);
    }

    const openOrderDetailsModal = (id) => {
        setCurrentOrderId(id);
        setOrderDetailsModallIsOpen(true);
    }
    const closeOrderDetailsModal = () => {
        setOrderDetailsModallIsOpen(false);
    }

    const OrderDetails = () => {
        console.log("showOrderDetails")
        let dishes = []
        for (const table of tables) {
            if (table.pendingOrders) {
                for (const pendingOrder of table.pendingOrders) {
                    if (pendingOrder.orderId === currentOrderId) {
                        dishes = [...pendingOrder.dishes];
                        console.log(dishes);
                        break;
                    }
                }
            }
        }
        console.log("________");
        return (<>
            <StyledTable>
                <thead>
                    <tr>
                        <td>#</td>
                        <td></td>
                        <td>Platillo</td>
                        <td>$</td>
                    </tr>
                </thead>
                <tbody>
                    {dishes.map(d => {
                        return (<tr>
                            <td>{d.quantity}</td>
                            <td></td>
                            <td>{d.name}</td>
                            <td>${d.price}</td>
                        </tr>);
                    })}
                </tbody>
            </StyledTable>
            <ColumnContainer2>
                <Button text="Ok" color="green" onClick={closeOrderDetailsModal} />
            </ColumnContainer2>
        </>);
    }

    const BillInfo = () => {
        console.log(bill);
        return (<>
            <StyledTable>
                <thead>
                    <tr>
                        <td>#</td>
                        <td></td>
                        <td>Platillo</td>
                        <td>$</td>
                    </tr>
                </thead>
                <tbody>
                    {bill.dishes.map(d => {
                        return (<tr>
                            <td>{d.quantity}</td>
                            <td></td>
                            <td>{d.name}</td>
                            <td>${d.price}</td>
                        </tr>);
                    })}
                </tbody>
            </StyledTable>
            <ColumnContainer2>
                <Button text="Ok" color="green" onClick={closeBillModal} />
            </ColumnContainer2>
        </>);
    }

    const deleteNotification = async (notificationId) => {
        console.log("deleteNotification");
        const newNotifications = [...notifications.filter(x => {
            return x._id !== notificationId;
        })]
        console.log(newNotifications);
        await axios.patch(`${process.env.REACT_APP_API_URL}waiters/${waiterId}`,
            { notifications: newNotifications });
        setNotifications(newNotifications);
    }

    const NotificationList = () => {
        if (notifications.length === 0) {
            return (
                <StyledH3>
                    No tienes notificaciones
                </StyledH3>);
        }
        return (<><StyledTableNotis>
            <thead>
                <tr>
                    <td>Mesa </td>
                    <td>Descripción</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                {notifications.map((x, _) => {
                    return (<>{!x.resolved &&
                        <tr key={x.number}>
                            <td>
                                {x.tableNumber + " - " + x.tableCode}
                            </td>
                            <td><NotiCard table={x.number} description={x.category}
                                onClick={() => {
                                    if (x.category === "orden") {
                                        return openOrderDetailsModal(x.orderId);
                                    }
                                    if (x.category === "cuenta") {
                                        return openBillModal(x.bill);
                                    }
                                }} />
                            </td>
                            <td><DeleteButton onClick={() => deleteNotification(x._id)} /></td>
                        </tr>
                    }</>);
                })}
            </tbody>
        </StyledTableNotis></>);
    }

    const TableList = () => {
        return (
            <ColumnContainer2>
                {assignedTables.map((x, _) => {
                    return (<div>{x.code} - {x.number}</div>);
                })}
            </ColumnContainer2>
        );
    }

    const loadWaiterInfo = async () => {
        console.log("loadWaiterInfo")
        console.log(waiterId);
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}waiters/${waiterId}`);

        const waiterData = res.data;
        setIsHeadWaiter(waiterData.isHeadWaiter);
        setNotifications(waiterData.notifications);
        let newAssignedTables = []
        for (const x of waiterData.assignedTables) {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}tables/${x.tableId}`);

            const tableData = res.data;
            newAssignedTables = [...newAssignedTables, tableData ?
                { code: tableData.code, number: tableData.number } : null]
        }
        setAssignedTables(newAssignedTables);
    }

    const loadTables = async () => {
        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}tables/`);
        setTables(res.data);
    }
    useEffect(() => {
        console.log("Mounted");
        loadWaiterInfo();
        loadTables();
    }, [])

    return (
        <>
            {console.log("RENDERED")}
            <Header />
            <RowContainer2>
                <NotificationButton color={notifications.length === 0 ? "gray" : "yellow"} onClick={openNotificationModal} />
                <ExitButton onClick={() => { history.push('/') }} />
            </RowContainer2>

            <ColumnContainer2>
                {isHeadWaiter && <>
                    <Button
                        text="Administrar Meseros" color="orange"
                        onClick={() => { history.push({ pathname: '/manageW', state: waiterId }) }}
                    />
                    <Button
                        text="Administrar Mesas" color="orange"
                        onClick={() => { history.push({ pathname: '/manageT', state: waiterId }) }}
                    />
                    <Button text="Administrar Platillos"
                        color="orange" onClick={() => { history.push({ pathname: '/manageD', state: waiterId }) }}
                    />
                    <Button text="Asignar meseros a mesas"
                        color="orange" onClick={() => { history.push({ pathname: '/assignT', state: waiterId }) }}
                    />
                </>
                }
                <Button text="Ver tus mesas" color="orange"
                    onClick={openYourTablesModal}
                />
            </ColumnContainer2>

            {/* NOTIFICATION'S MODAL*/}
            <Modal
                isOpen={NotifiModal}
                onRequestClose={closeNotificationModal}
                style={NotificationsModal}
            >
                <StyledH3> Notificaciones </StyledH3>

                <StyledHr />
                {/* <Button color="orange" text="Historial" /> {/*  when clicked, load modal of historial <not done yet*/}

                <NotificationList />
                <StyledHr />
                <Button color="green" text="Ok" onClick={closeNotificationModal} />

            </Modal>

            {/* SEE YOUR TABLES */}
            <Modal
                isOpen={yourTablesModal}
                onRequestClose={closeYourTablesModal}
                style={NotificationsModal}
            >
                <StyledH3>Código-Número</StyledH3>
                <StyledHr />
                <TableList />
                <StyledHr />
                <Button color="green" text="Ok" onClick={closeYourTablesModal} />

            </Modal>

            {/*ORDER MODAL-------------------- */}
            <Modal
                isOpen={orderDetailsModal}
                onRequestClose={closeOrderDetailsModal}
                style={OrderModal}
            >
                <StyledH3>Orden</StyledH3>
                <StyledHr />
                <OrderDetails />
            </Modal>

            {/*BILL MODAL-------------------- */}
            <Modal
                isOpen={billModalIsOpen}
                onRequestClose={closeBillModal}
                style={OrderModal}
            >
                <StyledH3>Cuenta</StyledH3>
                <StyledHr />
                <BillInfo />
            </Modal>
        </>
    );
}


export default Main


