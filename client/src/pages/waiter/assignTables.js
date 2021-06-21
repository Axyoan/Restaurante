import React, { useState, useEffect, setState } from 'react'
import axios from 'axios'
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import SimpleCard from "../../components/simpleCard";
import SimpleCardChangeColor from "../../components/simpleCardChangeColor";
import BackButton from "../../components/backButton";
import SquareColor from "../../components/squareColor";
import { ColumnContainer, ColumnContainer2, RowContainer, RowContainer2 } from "../../styles/core"

Modal.setAppElement('#root');

function AssignTables(props) {
    const history = useHistory();
    const [selectedColor, setSelectedColor] = useState("red");

    const { state: waiterId } = props.location;

    const [waiters, setWaiters] = useState([]);

    const assignWaiterToTable = async (id) => {
        let res
        switch (selectedColor) {
            case "red":
                res = await axios.get(
                    `${process.env.REACT_APP_API_URL}tables/?section=rojo`);
                break;
            case "yellow":
                res = await axios.get(
                    `${process.env.REACT_APP_API_URL}tables/?section=amarillo`);
                break;
            case "green":
                res = await axios.get(
                    `${process.env.REACT_APP_API_URL}tables/?section=verde`);
                break;
            case "blue":
                res = await axios.get(
                    `${process.env.REACT_APP_API_URL}tables/?section=azul`);
                break;
            case "orange":
                res = await axios.get(
                    `${process.env.REACT_APP_API_URL}tables/?section=naranja`);
                break;
        }
        const tableArray = res.data;
        for (const table of tableArray) {
            await axios.patch(
                `${process.env.REACT_APP_API_URL}tables/${table._id}`,
                {
                    assignedWaiters: [{ waiterId: id }]
                }
            )
        }
        await axios.patch(
            `${process.env.REACT_APP_API_URL}waiters/${id}`,
            {
                assignedTables:
                    [...tableArray.map(t => {
                        return { tableId: t._id }
                    })]
            }
        )
        console.log(res)
    }

    const WaiterList = () => {
        return (
            <ColumnContainer>
                {waiters.map(w => {
                    return (
                        < SimpleCardChangeColor
                            text={
                                w.name.firstName + " " +
                                w.name.paternalLastName
                            }
                            color={w.color}
                            changeColor={selectedColor}
                            onClick={() => assignWaiterToTable(w.id)}
                        />
                    );
                })}
            </ColumnContainer>
        );
    };

    const loadWaiters = async () => {
        console.log("loadWaiters")
        const res = await axios.get(`${process.env.REACT_APP_API_URL}waiters/`);
        const waitersData = res.data;

        setWaiters(await Promise.all(waitersData.map(async (w) => {
            let color = "#fff";
            const firstTable = w.assignedTables[0];

            if (firstTable) {
                console.log("______")
                console.log(firstTable);
                console.log("______")
                const r = await axios.get(
                    `${process.env.REACT_APP_API_URL}tables/${firstTable.tableId}`
                )
                console.log(r);
                const firstTableData = r.data;
                console.log(firstTableData);
                switch (firstTableData.section) {
                    case "rojo":
                        color = "red"
                        break;
                    case "amarillo":
                        color = "yellow"
                        break;
                    case "verde":
                        color = "green"
                        break;
                    case "azul":
                        color = "blue"
                        break;
                    case "naranja":
                        color = "orange"
                        break;
                }
            }

            return {
                id: w._id,
                name: {
                    firstName: w.name.firstName,
                    paternalLastName: w.name.paternalLastName,
                    maternalLastName: w.name.maternalLastName
                },
                isHeadWaiter: w.isHeadWaiter,
                birthDate: w.birthDate,
                startDate: w.startDate,
                address: w.address,
                phone: w.phone,
                email: w.email,
                color: color
            };
        })));
    }

    useEffect(() => {
        loadWaiters();
    }, [])


    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color="green" onClick={() => { history.push({ pathname: '/mainW', state: waiterId }) }} />
                <SubHeader text="Asignar meseros" />
            </RowContainer2>
            <ColumnContainer>
                <RowContainer>
                    <SquareColor color="red" onClick={() => { setSelectedColor("red") }} />
                    <SquareColor color="yellow" onClick={() => { setSelectedColor("yellow") }} />
                    <SquareColor color="green" onClick={() => { setSelectedColor("green") }} />
                    <SquareColor color="blue" onClick={() => { setSelectedColor("blue") }} />
                    <SquareColor color="orange" onClick={() => { setSelectedColor("orange") }} />
                </RowContainer>
            </ColumnContainer>
            <WaiterList />


        </>
    );
}


export default AssignTables;