import React from 'react'
import Header from "../../components/header";
import Button from "../../components/button";
import { RowContainer, StyledHr, StyledH2, StyledH3 } from "../../styles/core"

function main() {
    return (
        <>
            <Header />
            <RowContainer>
                <Button color="green" text="Pedir cuenta" />
                <Button color="red" text="Necesito ayuda" />
            </RowContainer>
            <StyledHr />
            <RowContainer>
                <StyledH2>Menú</StyledH2>
            </RowContainer>
        </>
    );
}


export default main


