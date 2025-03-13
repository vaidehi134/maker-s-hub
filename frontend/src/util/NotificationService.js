import { notification } from "antd";
import "./NotificationService.css";

// Custom notification service with improved styling
const NotificationService = {
  success: (message, description) => {
    notification.success({
      message: message || "Success",
      description: description || "",
      className: "custom-notification success-notification",
      placement: "topRight",
      duration: 4,
    });
  },

  error: (message, description) => {
    notification.error({
      message: message || "Error",
      description: description || "Something went wrong",
      className: "custom-notification error-notification",
      placement: "topRight",
      duration: 4,
    });
  },

  warning: (message, description) => {
    notification.warning({
      message: message || "Warning",
      description: description || "",
      className: "custom-notification warning-notification",
      placement: "topRight",
      duration: 4,
    });
  },

  info: (message, description) => {
    notification.info({
      message: message || "Information",
      description: description || "",
      className: "custom-notification info-notification",
      placement: "topRight",
      duration: 4,
    });
  },
};

export default NotificationService;
