import React from "react"
import { StyledNotificationButton } from "../styles/core.js"
import NotificationsIcon from '@material-ui/icons/Notifications';

function NotificationButton(props) {
    return (
        <>
            {/*<NotificationsIcon color={props.color}/> 
            
            */}
            <StyledNotificationButton onClick={props.onClick}>
                <NotificationsIcon style={{ color: props.color === 'gray' ? '#babab1' : '#FCBF49' }} />
            </StyledNotificationButton>
        </>
    );
}

export default NotificationButton;