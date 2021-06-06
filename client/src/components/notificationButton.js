import React from "react"
import { StyledNotificationButton } from "../styles/core.js"
import NotificationsIcon from '@material-ui/icons/Notifications';

function NotificationButton(props) {
    return (
        <>
            <StyledNotificationButton onClick={props.onClick}>
                <NotificationsIcon color={props.color}/>
            </StyledNotificationButton>
        </>
    );
}

export default NotificationButton;