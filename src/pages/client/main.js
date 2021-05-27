import React from 'react'
import Header from "../../components/header";
import Button from "../../components/button";
import { RowContainer } from "../../styles/core"

function main() {
    return (
        <>
            <Header />
            <RowContainer>
                <Button color="green" text="Pedir cuenta" />
                <Button color="red" text="Necesito ayuda" />
            </RowContainer>
        </>
    );
}


export default main


