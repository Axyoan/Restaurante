import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import SimpleCard from "../../components/simpleCard";
import DishCard from "../../components/dishCard";
import BackButton from "../../components/backButton"
import { ColumnContainer, RowContainer, RowContainer2, StyledCard } from "../../styles/core"
import { StyledSearchTextInput } from '../../styles/inputs.js'

Modal.setAppElement('#root');

function ManageDishes(props) {
    const [dishList, setDishList] = useState([])

    const history = useHistory();
    const { state: waiterId } = props.location;

    function DishList() {
        return (
            <ColumnContainer>
                {dishList.map((d, i) => {
                    return (<DishCard
                        key={d.key}
                        name={d.name}
                        price={d.price}
                        description={d.description}
                        onClick={() => {
                            history.push({
                                pathname: '/updateD',
                                state: {
                                    key: d.key,
                                    name: d.name,
                                    price: d.price,
                                    description: d.description,
                                    category: d.category,
                                    waiterId: waiterId
                                }
                            })
                        }}
                    />);
                })}
            </ColumnContainer>
        );
    };

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
                    description: d.description,
                    category: d.category
                }
            })
        ];
        setDishList(newDishList);
        console.log(newDishList);
    }

    useEffect(() => {
        console.log("Mounted");
        loadDishes();
    }, [])

    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color="green" onClick={() => { history.push({ pathname: '/mainW', state: waiterId }) }} />
                <SubHeader text="Administrar platillos" />
            </RowContainer2>

            <ColumnContainer>
                <Button text="Añadir nuevo platillo" color="orange"
                    onClick={() => { history.push({ pathname: '/addNewD', state: waiterId }) }} />
                <DishList />
            </ColumnContainer>

        </>
    );
}


export default ManageDishes