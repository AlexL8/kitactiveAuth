import React, { forwardRef, ReactNode } from "react";
import classNames from "classnames";
import styles from "./TextField.module.scss";

export interface TextFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  disabled?: boolean;
  type?: "text" | "password" | "number";
  placeholder?: string;
  label?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  error?: string;
  required?: boolean;
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      value,
      onChange,
      disabled,
      type,
      placeholder,
      name,
      label,
      leftIcon,
      rightIcon,
      error,
      required
    },
    ref,
  ) => {
    // console.log()
    return (
      <div className={styles.textFieldWrapper}>
        {label && (
          <label
            className={styles.textFieldPlaceholder}
            htmlFor={label}
          >
            {label}
          </label>
        )}

        {leftIcon && (
          <div className={styles.leftIcon}>
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={label}
          className={classNames(
            {
              [styles.textField]: true,
              [styles.textFieldWithLeftIcon]: !!leftIcon,
              [styles.textFieldWithRightIcon]: !!rightIcon,
              [styles.textFieldError]: error,
            }
          )}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          autoComplete={"off"}
          contentEditable="true"
        />

        {!!error && <p className={styles.errorMessage}>{error}</p>}

        {rightIcon && (
          <div className={styles.rightIcon}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);
