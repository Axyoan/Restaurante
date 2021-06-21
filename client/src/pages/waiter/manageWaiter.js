import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import SimpleCard from "../../components/simpleCard";
import BackButton from "../../components/backButton"
import { ColumnContainer, RowContainer, RowContainer2 } from "../../styles/core"
import { StyledSearchTextInput } from '../../styles/inputs.js'

Modal.setAppElement('#root');

function ManageWaiter(props) {
    const history = useHistory();
    const { state: waiterId } = props.location;

    const [waiters, setWaiters] = useState([]);

    const WaiterList = () => {
        { console.log(waiters); }
        return (
            <ColumnContainer>
                {waiters.map(w => {
                    return (
                        <>
                            {console.log(w.name.firstName)}
                            <SimpleCard
                                text={w.name.firstName + " " +
                                    w.name.paternalLastName
                                }
                                onClick={() => {
                                    return (history.push({
                                        pathname: '/updateW',
                                        state: {
                                            data: w,
                                            waiterId: waiterId
                                        }
                                    }));
                                }} />
                        </>
                    );
                })}
            </ColumnContainer>
        );
    };


    const loadWaiters = async () => {
        console.log("loadWaiters")
        const res = await axios.get(`${process.env.REACT_APP_API_URL}waiters/`);
        const waitersData = res.data;
        setWaiters(waitersData.map(w => {
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
                email: w.email
            };
        }));
    }

    useEffect(() => {
        loadWaiters();
    }, [])

    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color="green" onClick={() => { history.push({ pathname: '/mainW', state: waiterId }) }} />
                <SubHeader text="Administrar meeseros" />
            </RowContainer2>

            <ColumnContainer>
                <Button text="Añadir nuevo mesero" color="orange"
                    onClick={() => { history.push({ pathname: '/addNewW', state: waiterId }) }} />
                <WaiterList />
            </ColumnContainer>

        </>
    );
}


export default ManageWaiter