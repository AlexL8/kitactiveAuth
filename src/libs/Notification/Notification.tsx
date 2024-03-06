import React, { FC, ReactNode, ReactText } from "react";
import { Slide, ToastContainer } from "react-toastify";
import { IconClose} from "./icons/IconClose";
import { NotyTypes, ToastOptions } from "./Notifications.types";
import { NOTIFICATIONS } from "./Notifications.constants";
import "react-toastify/dist/ReactToastify.css";
import "./CustomReactToastify.scss";
import { omit } from "lodash";

import styles from "./Notifications.module.scss";

export const NotificationComponent: FC = () => {
  return (
    <ToastContainer
      position="top-right"
      newestOnTop={true}
      draggable={false}
      hideProgressBar={true}
      pauseOnHover={true}
      pauseOnFocusLoss={false}
      toastClassName="reactToastifyContainer"
      bodyClassName="reactToastifyBody"
      className="reactToastifyWrap"
    />
  );
};

export const createCustomContent = (
  title: string,
  content: ReactNode,
  type: NotyTypes,
  fixOnTitleClick?: boolean,
  fixOnContentClick?: boolean,
): ReactNode => {
  const { icon, titleColor, contentColor } = NOTIFICATIONS[type];
  return (
    <>
      <div className={styles.contentBlock}>
        <p
          className={styles.title}
          style={{ color: titleColor }}
          onClick={(ev) => {
            if (fixOnTitleClick) {
              ev.preventDefault();
              ev.stopPropagation();
            }
          }}
        >
          {title}
        </p>
        {content && (
          <div
            className={styles.content}
            style={{ color: contentColor }}
            onClick={(ev) => {
              if (fixOnContentClick) {
                ev.preventDefault();
                ev.stopPropagation();
              }
            }}
          >
            {content}
          </div>
        )}
      </div>
    </>
  );
};

const toastFactory = (type: NotyTypes) => (
  title: string,
  content?: ReactNode,
  options?: ToastOptions,
): ReactText => {
  return NOTIFICATIONS[type].action(
    createCustomContent(
      title,
      content,
      type,
      options?.fixOnTitleClick,
      options?.fixOnContentClick,
    ),
    {
      transition: Slide,
      autoClose: 2000,
      ...omit(options, ["fixOnContentClick", "fixOnTitleClick"]),
    },
  );
};

type ToastFn = (
  title: string,
  content?: ReactNode,
  options?: ToastOptions,
) => ReactText;

export interface INotification {
  success: ToastFn;
  error: ToastFn;
  warning: ToastFn;
}

export const Notification: INotification = {
  success: toastFactory(NotyTypes.SUCCESS),
  error: toastFactory(NotyTypes.ERROR),
  warning: toastFactory(NotyTypes.WARNING),
};
