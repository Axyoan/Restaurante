import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import Button from "../../components/button";
import NotificationButton from "../../components/notificationButton"
import DeleteButton from "../../components/deleteButton"
import ExitButton from "../../components/ExitButton"
import NotiCard from "../../components/notiCard"
import { ColumnContainer2, RowContainer, RowContainer2, StyledHr, StyledH3, StyledTableNotis, StyledTable} from "../../styles/core"
import {NotificationsModal, OrderModal} from "../../styles/modals"


Modal.setAppElement('#root');

function Main() {
    const history = useHistory();
    const [NotifiModal, setNotificationlIsOpen] = useState(false);
    const [yourTablesModal, setYourTablesModallIsOpen] = useState(false);
    const [orderDetailsModal, setOrderDetailsModallIsOpen] = useState(false);
   
    const openNotificationModal = () =>{
        setNotificationlIsOpen(true);        
    }
    const closeNotificationModal = () =>{
        setNotificationlIsOpen(false);
    }
    const openYourTablesModal = () =>{
        setYourTablesModallIsOpen(true);        
    }
    const closeYourTablesModal = () =>{
        setYourTablesModallIsOpen(false);
    }
    const openOrderDetailsModal = () =>{
        setOrderDetailsModallIsOpen(true);        
    }
    const closeOrderDetailsModal = () =>{
        setOrderDetailsModallIsOpen(false);
    }
    
    const showOrderDetails = () => {
        // SHOWS WHEN ONCLICK ON AN ORDER NOTIFICATION 
        return (
            <>
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
                                <tr>
                                    <td>1</td>
                                    <td></td>
                                    <td>Queso fundido</td>
                                    <td>$40.00</td>
                                </tr>
                    </tbody>
                </StyledTable>
                <ColumnContainer2>
                    <Button text="Ok" color="green" onClick={() => closeOrderDetailsModal()} />
                </ColumnContainer2>
            </>
        );
    }

    
    const loadNotifications = () =>{
        return (
            <> 
            {/*if its an order, when clicked open its details <validate>*/}
            <StyledTableNotis>
                    <thead>
                        <tr>
                            <td>Mesa </td>
                            <td>Descripción</td>
                            <td></td>
                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="2"><NotiCard table="1" description= "Orden" onClick={openOrderDetailsModal} /></td>
                            <td><DeleteButton/></td>  
                        </tr>
                        <tr>
                            <td colspan="2"><NotiCard table="1" description= "Cuenta" /></td>
                            <td><DeleteButton/></td>  
                        </tr>
                    </tbody>
                </StyledTableNotis>
            </>
        );
    }

    const loadYourTables = () => {
        return (
            <>
                  <h1>1</h1>  
                  <h1>3</h1>  
                  <h1>5</h1>  
                  <h1>10</h1>  
                
            </>
        );
    }
    return (
        <>
            <Header />
            <RowContainer2>
                <NotificationButton color="disabled" onClick={openNotificationModal}/>
                <ExitButton onClick={()=>{history.push('/')}}/>
            </RowContainer2>

            <ColumnContainer2>
                <Button text="Administrar Meseros" color="orange" onClick={()=>{history.push('/manageW')}}/> 
                                
                <Button text="Administrar Mesas" color="orange" onClick={()=>{history.push('/manageT')}}/>
                
                <Button text="Administrar Platillos" color="orange" onClick={()=>{history.push('/manageD')}}/>
                
                <Button text="Asignar meseros a mesas" color="orange" onClick={()=>{history.push('/assignT')}}/>
                
                <Button text="Ver tus mesas" color="orange" onClick = {openYourTablesModal}/>
            </ColumnContainer2>

            {/* NOTIFICATION'S MODAL*/ }
            <Modal
                isOpen={NotifiModal}
                onRequestClose={closeNotificationModal}
                style={NotificationsModal}
            >
                <StyledH3> Notificaciones </StyledH3>
                
                <StyledHr/>
                {/* <Button color="orange" text="Historial" /> {/*  when clicked, load modal of historial <not done yet*/}
                
                {loadNotifications()}
                <StyledHr/>
                <Button color="green" text="Ok" onClick={closeNotificationModal}/>

            </Modal>

            {/* SEE YOUR TABLES */}
            <Modal
                isOpen={yourTablesModal}
                onRequestClose={closeYourTablesModal}
                style={NotificationsModal}
            >
                <StyledH3> Id de tus mesas: </StyledH3>
                <StyledHr/>
                {loadYourTables()}
                <StyledHr/>
                <Button color="green" text="Ok" onClick={closeYourTablesModal}/>

            </Modal>
            
            {/*ORDER MODAL-------------------- */}
            <Modal
                isOpen={orderDetailsModal}
                onRequestClose={closeOrderDetailsModal}
                style={OrderModal}
            >
                <StyledH3>Orden</StyledH3>
                <StyledHr />
                {showOrderDetails()}
            </Modal>

        </>
    );
}


export default Main


