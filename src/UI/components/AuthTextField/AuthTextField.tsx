import React, { FC } from "react";
import { TextField, TextFieldProps } from "../TextField/TextField";
import styles from "./AuthTextField.module.scss";
import classNames from "classnames";

export const AuthTextField: FC<TextFieldProps> = ({
  value,
  onChange,
  leftIcon,
  rightIcon,
  ...other
}) => {
  return (
    <div
      className={classNames({
        [styles.authFieldWrapper]: true,
        [styles.authFieldWrapperWithLeftIcon]: Boolean(leftIcon),
        [styles.authFieldWrapperWithRightIcon]: Boolean(rightIcon),
      })}
    >
      <TextField
        value={value}
        onChange={onChange}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...other}
      />
    </div>
  );
};
