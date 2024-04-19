import  { memo, useEffect, useState } from 'react';
import './notifications.css'

const Notifications = (props) => {
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        if (props.notification.type > 0 && !showNotification) {
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
            }, 2000);
        }
    }, [props.notification]);

    console.log(props);
    return(
        <>
        { showNotification &&  <span className={"notification-bar " + (props.notification.type ? 'success' : 'err')}>{ props.notification.message }</span> }
        </>
    )
}

export default memo(Notifications);