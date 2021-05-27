import React from 'react'
import Header from "../../components/header";
import Button from "../../components/button";
import DishCard from "../../components/dishCard"
import ScrollButton from "../../components/scrollButton"
import { ColumnContainer, RowContainer, StyledHr, StyledH2 } from "../../styles/core"
import StickyFooterButton from '../../components/stickyFooterButton';

function main() {
    const handleClick = (e) => {
        alert("click");
    }
    const handleScroll = () => {
        window.scroll({
            top: 0,
            behavior: 'smooth',
        });
    }
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
            <ColumnContainer>
                <DishCard title="Guacamole" price="50" description="Lorem ipsum"
                    onClick={handleClick}
                />
                <DishCard title="Queso fundido" price="40" description="Lorem ipsum"
                    onClick={handleClick}
                />
                <DishCard title="Fetuccini" price="125" description="Lorem ipsum"
                    onClick={handleClick} />
            </ColumnContainer>
            <ScrollButton onClick={handleScroll}>scroll up</ScrollButton>
            <StickyFooterButton color="blue" text="Ordenar" />
        </>
    );
}


export default main


