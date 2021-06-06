import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import SimpleCard from "../../components/simpleCard";
import BackButton from "../../components/backButton"
import { ColumnContainer, RowContainer, RowContainer2} from "../../styles/core"
import { StyledSearchTextInput} from '../../styles/inputs.js'

Modal.setAppElement('#root');

function ManageWaiter() {
    const history = useHistory();

    const loadWaiters = () => {
        return (
            <ColumnContainer>
                <SimpleCard text="Juan Perez" onClick={()=>{
                    history.push({
                        pathname: '/updateW',
                        state: {
                            data: 'Juan Perez'}})}}/>
                <SimpleCard text="Gresia López" onClick={()=>{
                    history.push({
                        pathname: '/updateW',
                        state: {
                            data: 'Gresia López'}})}}/>
                <SimpleCard text="Ade Orozco" onClick={()=>{
                    history.push({
                        pathname: '/updateW',
                        state: {
                            data: 'Ade Orozco'}})}}/>
            </ColumnContainer>
        );
    };


    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color ="green" onClick={()=>{history.push('/mainW')}}/>
                <SubHeader text= "Administrar meeseros"/>
            </RowContainer2>

            <ColumnContainer>
                <Button text= "Añadir nuevo mesero" color="orange" onClick={()=>{history.push('/addNewW')}}/>
                {
                    <RowContainer2>
                        <StyledSearchTextInput />
                        <Button text= "Buscar" color="orange"/>
                    </RowContainer2>
                }
                {loadWaiters()}
            </ColumnContainer>
          
        </>
    );
}


export default ManageWaiter