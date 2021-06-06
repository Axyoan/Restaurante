import styled from "styled-components"
import { createGlobalStyle } from "styled-components"

export const StyledHeader = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px 16px;
    height: 59px;
    left: 0px;
    top: 0px;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    background: #FCBF49;
    h1{
        left: 16px;
        top: 6.5px;
        font-family: Montserrat;
        font-size: 24px;
        font-weight: 700;
        letter-spacing: 0.1em;
        flex: none;
        order: 0;
        flex-grow: 0;
        margin: 0px 88px;
    }
`;


export const ColumnContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 50%;
    margin: 5%
`;

export const ColumnContainer2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 1em;
    align-items: stretch;
    height: 50%;
    margin: 10%;

`;

export const RowContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 1em;
    column-gap: 2em;
`;

export const RowContainer2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    column-gap: 2em;
`;

export const StyledButton = styled.button`
    cursor: pointer;
    border: none;
    border-radius: 25px;
    background-color:${props => (props.color === "red" ? "#D62828" : (props.color === "orange" ? "#F77F00" : (props.color === "blue" ? "#003049" : (props.color === "green" ? "#EAE2B7" : "#ffffff"))))};
    color:${props => ((props.color === "red" || props.color === "blue") ? "#fff" : "#000")};
    font-size: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    transition: background-color .15s ease-out;
    box-shadow: 2px 2px 2px #000;
    &:active{
        box-shadow: 0px 0px 0px 2px ${props => (props.color === "red" ? "#D62828" : (props.color === "orange" ? "#F77F00" : (props.color === "blue" ? "#003049" : (props.color === "green" ? "#EAE2B7" : "#ffffff"))))};
    }
`;

export const StyledScrollButton = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    border:none;
    background: transparent;
    position: -webkit-sticky;
    position: sticky;
    bottom: 55px;
    left: 100%;
    font-size: 15px;

`;

export const StyledStickyFooterButton = styled.button`
    border: none;
    background-color:${props => (props.color === "red" ? "#D62828" : (props.color === "orange" ? "#F77F00" : (props.color === "blue" ? "#003049" : (props.color === "green" ? "#EAE2B7" : "#ffffff"))))};
    color:${props => ((props.color === "red" || props.color === "blue") ? "#fff" : "#000")};
    font-size: 25px;
    display: -webkit-flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    transition: background-color .35s linear;
    position: sticky;
    position: -webkit-sticky;
    bottom: 0px;
    width: 100%;
    &:active{
        background: #fff;
        color: ${props => (props.color === "red" ? "#D62828" : (props.color === "orange" ? "#F77F00" : (props.color === "blue" ? "#003049" : (props.color === "green" ? "#EAE2B7" : "#ffffff"))))};
    }
`;

export const StyledIconButton = styled.button`
    border: none;
    background: transparent;
`;


export const StyledHr = styled.hr`
    width: 80%;
    width: ${props => (props.widthPx)}px;
    width: ${props => (props.widthPercentage)}%;
    height: 0px;
    left: 21px;
    top: 172px;
`


export const StyledH2 = styled.h2`
    height: 24px;
    left: 122px;
    top: 185px;

    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 100%;

    letter-spacing: 0.5em;
    text-transform: uppercase;
`

export const StyledH3 = styled.h3`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0px;
    width: 197px;
    height: 24px;
    left: 18.5px;
    top: 0px;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 27px 0px;
`
export const StyledCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 9px;
    width: 234px;
    height: 170px;
    left: 0px;
    top: 43px;

    background: #FFFFFF;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    order: 1;
    margin: 27px 0px;
`


export const StyledTitle = styled.div`
    display: flex;
    width: 200px;
    top: 10px;
    position: relative;
    background: #EAE2B7;
    border-radius: 5px;
    margin: 0px 0px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`
export const StyledTable = styled.table`
    position: static;
    thead{
        td{
            text-align: center;
            line-height: 200%;
            font-size: 16px;
            font-weight: 600;
        }
    }
    tbody{
        td{
            text-align: center;
            font-size: 16px;
            font-weight: 200;
            padding: 1px 7px;
            vertical-align:middle;

        }
        td:first-of-type{
            margin: 0;
            padding: 0;
            width: 10%;
        }
        td:nth-of-type(2){
            border-right: 2px dotted black;
            padding-left: 1px;
            width: 10%;
        }
        td:nth-of-type(3){
            width: 70%;
        }
        td:nth-of-type(4){
            width: 10%;
        }
    }

`

export const StyledTableNotis = styled.table`
    position: static;
    thead{
        td{
            text-align: center;
            line-height: 100%;
            font-size: 16px;
            font-weight: 600;
        }
    }
    tbody{
        td{
            text-align: center;
            font-size: 16px;
            font-weight: 200;
            padding: 1px 7px;
            vertical-align:middle;
        }
        td:first-of-type{
            width: 90%;
        }
        td:nth-of-type(2){
            width: 10%;
        }
    }

`


export const StyledBillTable = styled.table`
    position: static;
    display: block;
    margin: 1em 0em;
    thead{
        td{
            text-align: center;
            line-height: 200%;
            font-size: 16px;
            font-weight: 600;
        }
    }
    tbody{
        td{
            text-align: center;
            font-size: 16px;
            font-weight: 200;
            padding: 1px 7px;
            vertical-align:middle;

        }
        td:first-of-type{
            border-right: 2px dotted black;
            padding-left: 1px;
            width: 10%;
        }
        td:nth-of-type(2){
            width: 80%;
        }
        td:nth-of-type(3){
            width: 10%;
        }
}

`

export const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;900&display=swap');
/*
../../public/images/
*/
    * {
        font-family: "Montserrat", sans-serif;
        font-size: 24px;
        font-weight: 300;
    }
    body {
        background-image: url("https://i.imgur.com/el9I4lu.png");
        background-repeat: repeat;
        background-size: 100%;
    }

    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            vertical-align: baseline;
    }
    article, aside, details, figcaption, figure,
        footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote: before, blockquote: after,
        q: before, q: after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
}
`;

export const StyledNotificationButton = styled.button`
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    border:none;
    background: transparent;
    position: -webkit-sticky;
    position: sticky;
    bottom: 55px;
    right: 100%;
    font-size: 15px;
`;

export const StyledExitButton = styled.button`
    display: flex;
    flex-direction: row;
    align-items: center;
    border:none;
    background: transparent;
    position: -webkit-sticky;
    position: sticky;
    bottom: 55px;
    left: 100%;
    font-size: 15px;
    cursor: pointer;
`;


export const StyledBackButton = styled.button`
    margin-top: 5px;
    margin-left:5px;
    right: 100%;
    border: none;
    border-radius: 50px;
    background-color:${props => (props.color === "red" ? "#D62828" : (props.color === "orange" ? "#F77F00" : (props.color === "blue" ? "#003049" : (props.color === "green" ? "#EAE2B7" : (props.color === "yellow" ? "#fbdcc4" : "#ffffff")))))};
    position: sticky;
    display: flex;
    align-items: center;
    padding: 3px 5px;
    transition: background-color .15s ease-out;
    box-shadow: 2px 2px 2px #000;
    cursor: pointer;

`;

export const StyledSubHeader = styled.header`
    display: flex;
    position: sticky;
    left: 100%;
    flex-direction: row;
    align-items: center;
    padding: 18px;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25);
    background: #FCBF49;
    h1{
        font-family: Montserrat;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: 0.1em;
        flex: none;
        flex-grow: 0;
        left: 100%;
    }
`;
export const StyledSimpleCard = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px;
    width: 120px;
    height: 40px;
    top: 43px;
    font-size: 18px;

    background-color:${props => (props.color === "red" ? "#D62828" : (props.color === "orange" ? "#F77F00" : (props.color === "blue" ? "#003049" : (props.color === "green" ? "#EAE2B7" : (props.color === "yellow" ? "#FFD358" : "#ffffff")))))};
    color:${props => ((props.color === "red" || props.color === "blue") ? "#fff" : "#000")};
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 35px;
    transition: background-color .15s ease-out;
    cursor: pointer;
    
`;

export const StyledSimpleCard2 = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px 10px;
    height: 25%;
    width: 40px;
    font-size: 20px;

    background-color:${props => (props.color === "red" ? "#D62828" : (props.color === "orange" ? "#F77F00" : (props.color === "blue" ? "#003049" : (props.color === "green" ? "#EAE2B7" : (props.color === "yellow" ? "#FFD358" : "#ffffff")))))};
    color:${props => ((props.color === "red" || props.color === "blue") ? "#fff" : "#000")};
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    transition: background-color .15s ease-out;
    cursor: pointer;
    
`;

export const StyledSquareColor = styled.button`
    cursor: pointer;
    border: none;
    background-color:${props => (props.color === "red" ? "#D62828" : (props.color === "orange" ? "#F77F00" : (props.color === "blue" ? "#003049" : (props.color === "green" ? "#EAE2B7" : (props.color === "yellow" ? "#FFD358" : "#ffffff")))))};
    color:${props => ((props.color === "red" || props.color === "blue") ? "#fff" : "#000")};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    transition: background-color .15s ease-out;
    box-shadow: 2px 2px 2px #000;
    &:active{
        box-shadow: 0px 0px 0px 2px ${props => (props.color === "red" ? "#D62828" : (props.color === "orange" ? "#F77F00" : (props.color === "blue" ? "#003049" : (props.color === "green" ? "#EAE2B7" :  (props.color === "yellow" ? "#FFD358" : "#ffffff")))))};
    }
`;

export const StyledGridContainer = styled.div`
  display: ${props => (props.inline ? "inline-grid" : "grid")};
  grid-template-columns: repeat(${props => props.columns}, 1fr);
`;

export const StyledNotiCard = styled.button`
    border: 5px;
    background-color: #ffffff;
    display: flex;
    flex-direction: row;
    padding-left: 25px;
    padding-right: 25px;
    font-size: 16px;
    width: 180px;
    justify-content: space-between;
    box-shadow: 1px 1px 1px #000;
    transition: background-color .15s ease-out;
`;