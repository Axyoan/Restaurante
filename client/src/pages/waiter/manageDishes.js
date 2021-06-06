import React, { useState, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import SimpleCard from "../../components/simpleCard";
import DishCard from "../../components/dishCard";
import BackButton from "../../components/backButton"
import { ColumnContainer, RowContainer, RowContainer2,StyledCard} from "../../styles/core"
import { StyledSearchTextInput} from '../../styles/inputs.js'

Modal.setAppElement('#root');

function ManageDishes() {
    const history = useHistory();

    const loadDishes = () => {
        return (
            <ColumnContainer>
                <SimpleCard text="Guacamole" onClick={()=>{
                    history.push({
                        pathname: '/updateD',
                        state: {
                            data: 'Guacamole'}})}}/>
               
                <SimpleCard text="Queso fundido" onClick={()=>{
                    history.push({
                        pathname: '/updateD',
                        state: {
                            data: 'Queso fundido'}})}}/>
                
                <SimpleCard text="Fetuccini" onClick={()=>{
                    history.push({
                        pathname: '/updateD',
                        state: {
                            data: 'Fetuccini'}})}}/>

            </ColumnContainer>
         
        );
    };


    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color ="green" onClick={()=>{history.push('/mainW')}}/>
                <SubHeader text= "Administrar platillos"/>
            </RowContainer2>

            <ColumnContainer>
                <Button text= "Añadir nuevo platillo" color="orange" onClick={()=>{history.push('/addNewD')}}/>
                {
                    <RowContainer2>
                        <StyledSearchTextInput />
                        <Button text= "Buscar" color="orange"/>
                    </RowContainer2>
                }
                {loadDishes()}
            </ColumnContainer>
          
        </>
    );
}


export default ManageDishes