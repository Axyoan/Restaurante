import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';

import { StyledIconButton } from "../styles/core.js"

function DeleteButton(props) {
    return (
        <>
            <StyledIconButton onClick={props.onClick}>
                <HighlightOffOutlinedIcon fontSize="small" color="error" />
            </StyledIconButton>
        </>
    );
}

export default DeleteButton;