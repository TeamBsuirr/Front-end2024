import { notification } from "antd";

notification.config({
    placement: 'top',
    top: 70,
    duration: 3,
    className: "notificationError",
    stack: {
        threshold: 5
    }
});

