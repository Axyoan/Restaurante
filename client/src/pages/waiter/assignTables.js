import React, { useState, useEffect, setState } from 'react'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import SimpleCard from "../../components/simpleCard";
import SimpleCardChangeColor from "../../components/simpleCardChangeColor";
import BackButton from "../../components/backButton";
import SquareColor from "../../components/squareColor";
import { ColumnContainer, ColumnContainer2, RowContainer, RowContainer2} from "../../styles/core"

Modal.setAppElement('#root');

function AssignTables() {
    const history = useHistory();
    const [actColor, setColor] =useState("#FFFFF");

    
    const loadWaiters = () => {

        return (
                            
            <ColumnContainer>
                <SimpleCardChangeColor text="Juan Perez" changeColor= {actColor} />

                <SimpleCardChangeColor text="Gresia López" changeColor= {actColor} />
                
                <SimpleCardChangeColor text="Ade Orozco" changeColor= {actColor} />
            </ColumnContainer>
        );
    };

    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color ="green" onClick={()=>{history.push('/mainW')}}/>
                <SubHeader text= "Asignar meseros"/>
            </RowContainer2>
            <ColumnContainer>
                <Button text="Visualizar restaurante"/>

                <RowContainer>
                    {/* COLORS */}
                    <SquareColor color="red" onClick ={() => {setColor("red")}}/>
                    <SquareColor color= "yellow" onClick ={() => {setColor("yellow")}}/>
                    <SquareColor color="green" onClick ={() => {setColor("green")}}/>
                    <SquareColor color="blue" onClick ={() => {setColor("blue")}}/>
                    <SquareColor color="orange" onClick ={() => {setColor("orange")}}/>
                </RowContainer>
            </ColumnContainer>
            
            {loadWaiters()}
            
          
        </>
    );
}


export default AssignTables;