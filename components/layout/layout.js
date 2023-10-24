import { Fragment, useContext } from "react";

import MainHeader from "./main-header";
import NotificationContext from "@/store/notification-context";
import Notification from "@/components/ui/notification";

function Layout(props) {
    const notificationCtx = useContext(NotificationContext);

    const activeNotification = notificationCtx.notification;

    return (
        <Fragment>
            <MainHeader />
            <main>{props.children}</main>
            <Notification
                title={activeNotification?.title}
                message={activeNotification?.message}
                status={activeNotification?.status}
            />
        </Fragment>
    );
}

export default Layout;
