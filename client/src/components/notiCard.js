import { FormControlLabel } from "@material-ui/core";
import React from "react"
import { StyledNotiCard, RowContainer2} from "../styles/core.js"

function NotiCard(props) {
    return (
        <>
            <StyledNotiCard onClick={props.onClick}>
                    <h style={{fontSize: 16}} >{props.table}</h>
                    <h style={{fontSize: 16}}>{props.description}</h>
            </StyledNotiCard>
        </>
    );
}

export default NotiCard;