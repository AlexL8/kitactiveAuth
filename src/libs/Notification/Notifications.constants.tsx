import React from "react";
import { toast } from "react-toastify";
import { NotyTypes } from "./Notifications.types";
import { IconError } from "./icons/IconError";
import { IconSuccess} from "./icons/IconSuccess";
import { IconWarningOutlined} from "./icons/IconWarningOutlined";

export const NOTIFICATIONS = {
  [NotyTypes.ERROR]: {
    action: toast.error,
    icon: <IconError />,
    titleColor: "#e03c3c",
    contentColor: "#000",
  },
  [NotyTypes.SUCCESS]: {
    action: toast.success,
    icon: <IconSuccess />,
    titleColor: "#b8eaaa",
    contentColor: "#000",
  },
  [NotyTypes.WARNING]: {
    action: toast.warn,
    icon: <IconWarningOutlined />,
    titleColor: "#f3a54e",
    contentColor: "#78adda",
  },
};
