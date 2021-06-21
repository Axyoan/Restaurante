import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import Modal from 'react-modal';
import Header from "../../components/header";
import SubHeader from "../../components/subHeader";
import Button from "../../components/button";
import SimpleCardTable from "../../components/simpleCardTable";
import BackButton from "../../components/backButton"
import { ColumnContainer, RowContainer, RowContainer2, ColumnContainer2, StyledSimpleCard2, StyledH3, StyledHr, StyledGridContainer } from "../../styles/core"
import { StyledSearchTextInput, StyledSelectBox, StyledTextInput2 } from '../../styles/inputs.js'
import { NotificationsModal, NewTableModal } from '../../styles/modals'

Modal.setAppElement('#root');

function ManageTables(props) {
    const history = useHistory();
    const [newTableModal, setNewTableModalIsOpen] = useState(false);
    const [updateTableModal, setUpdateTableModalIsOpen] = useState(false);
    const [tables, setTables] = useState([]);
    const [selectedTable, setSelectedTable] = useState(null);
    const [currentSection, setCurrentSection] = useState(null);
    const [currentNumber, setCurrentNumber] = useState(null);
    const { state: waiterId } = props.location;

    const openNewTableModal = () => {
        setNewTableModalIsOpen(true);
    }
    const closeNewTableModal = async (willCreate) => {
        if (willCreate && currentSection && currentNumber) {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}tables/?number=${currentNumber}`);
            const prevTableData = res.data;
            if (prevTableData === null) {
                const postRes = await axios.post(
                    `${process.env.REACT_APP_API_URL}tables/`,
                    {
                        number: currentNumber,
                        section: currentSection,
                    }
                )
            }
            loadTables();
            setCurrentSection(null);
            setCurrentNumber(null);
        }
        setNewTableModalIsOpen(false);
    }

    function openUpdateTableModal(tableData) {
        setUpdateTableModalIsOpen(true);
        setSelectedTable(tableData)
    }
    const closeUpdateTableModal = async (willUpdate, willDelete) => {
        if (willUpdate && currentSection && currentNumber) {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}tables/?number=${currentNumber}`);
            const prevTableData = res.data;

            if (prevTableData === null || currentNumber === selectedTable.number) {
                const postRes = await axios.put(
                    `${process.env.REACT_APP_API_URL}tables/${selectedTable.id}`,
                    {
                        number: currentNumber,
                        section: currentSection,
                    }
                )
            }
            loadTables();
            setCurrentSection(null);
            setCurrentNumber(null);
        }
        if (willDelete) {
            console.log(selectedTable);
            const res = await axios.delete(
                `${process.env.REACT_APP_API_URL}tables/${selectedTable.id}`);
            loadTables();
            setCurrentSection(null);
            setCurrentNumber(null);
        }
        setUpdateTableModalIsOpen(false);
    }

    const TableList = () => {
        /*<SimpleCardTable text="1" color="blue" onClick={openUpdateTableModal} /> */
        return (
            <>
                <StyledGridContainer inline={true} columns={3}>
                    {tables.map(x => {
                        return (
                            <SimpleCardTable
                                text={`${x.number} ${x.code}`}
                                color={
                                    x.section === 'rojo' ? 'red' :
                                        x.section === 'verde' ? 'green' :
                                            x.section === 'amarillo' ? 'yellow' :
                                                x.section === 'azul' ? 'blue' :
                                                    x.section === 'naranja' ? 'orange' : '#fff'
                                }
                                onClick={() => openUpdateTableModal({
                                    section: x.section,
                                    number: x.number,
                                    code: x.code,
                                    id: x.id
                                })}
                            />
                        );
                    })}
                </StyledGridContainer>
            </>

        );
    }

    const handleSectionChange = (e) => {
        switch (e.target.value) {
            case "red":
                setCurrentSection("rojo");
                break;
            case "yellow":
                setCurrentSection("amarillo");
                break;
            case "green":
                setCurrentSection("verde");
                break;
            case "blue":
                setCurrentSection("azul");
                break;
            case "orange":
                setCurrentSection("naranja");
                break;
        }
    }

    const handleNumberChange = (e) => {
        setCurrentNumber(e.target.value);
    }

    const addNewTable = () => {
        return (
            /* Numero y seccion */
            <>
                <ColumnContainer2>
                    <RowContainer>
                        Sección:
                        <StyledSelectBox onChange={handleSectionChange}>
                            <option value="" hidden> color...</option>
                            <option value="red"> rojo</option>
                            <option value="yellow">amarillo</option>
                            <option value="green">verde</option>
                            <option value="blue">azul</option>
                            <option value="orange">naranja</option>
                        </StyledSelectBox>

                    </RowContainer>
                    <RowContainer>
                        Número:
                        <StyledTextInput2 onChange={handleNumberChange} />
                    </RowContainer>
                </ColumnContainer2>
            </>

        );
    }

    const updateTable = () => {
        return (
            /* Numero y seccion */
            <>
                <ColumnContainer2>
                    <RowContainer>
                        Sección:
                        <StyledSelectBox onChange={handleSectionChange}>
                            <option value={(selectedTable && selectedTable.section) || ""} hidden>
                                color...
                            </option>
                            <option value="red"> rojo</option>
                            <option value="yellow">amarillo</option>
                            <option value="green">verde</option>
                            <option value="blue">azul</option>
                            <option value="orange">naranja</option>
                        </StyledSelectBox>

                    </RowContainer>
                    <RowContainer>
                        Número:
                        <StyledTextInput2 onChange={handleNumberChange} defaultValue={(selectedTable && selectedTable.number) || 0} />
                    </RowContainer>
                    <RowContainer>
                        Código: {selectedTable && selectedTable.code}
                    </RowContainer>
                </ColumnContainer2>
            </>
        );

    }

    const loadTables = async () => {
        console.log("loadTables")
        const res = await axios.get(`${process.env.REACT_APP_API_URL}tables/`);
        const tablesData = res.data;
        setTables(tablesData.map(x => {
            return {
                number: x.number,
                code: x.code,
                section: x.section,
                id: x._id
            };
        }));
    }

    useEffect(() => {
        loadTables();
    }, [])

    return (
        <>
            <Header />
            <RowContainer2>
                <BackButton color="green"
                    onClick={() => { history.push({ pathname: '/mainW', state: waiterId }) }} />
                <SubHeader text="Administrar mesas" />
            </RowContainer2>

            <ColumnContainer>
                <Button text="Añadir nueva mesa" color="orange"
                    onClick={openNewTableModal} />
                <TableList />
            </ColumnContainer>

            {/*ADD NEW TABLE  <DONE>*/}
            <Modal
                isOpen={newTableModal}
                onRequestClose={closeNewTableModal}
                style={NewTableModal}
            >
                <StyledH3> Nueva mesa: </StyledH3>
                <StyledHr />
                {addNewTable()}
                <RowContainer>
                    <Button color="red" text="Cancelar" onClick={() => closeNewTableModal(false)} />
                    <Button color="green" text="Guardar" onClick={() => closeNewTableModal(true)} />
                </RowContainer>
            </Modal>


            {/* UPDATE TABLE <DONE>*/}
            <Modal
                isOpen={updateTableModal}
                onRequestClose={closeUpdateTableModal}
                style={NewTableModal}
            >
                <StyledH3> Modificar mesa: </StyledH3>
                <StyledHr />
                {updateTable()}

                <RowContainer>
                    <Button color="green" text="Confirmar" onClick={() => closeUpdateTableModal(true, false)} />
                    <Button color="red" text="Eliminar" onClick={() => closeUpdateTableModal(false, true)} />
                </RowContainer>

            </Modal>
        </>
    );
}


export default ManageTables