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
  onKeyUp?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  classes?: {
    root?: string;
    input?: string;
    label?: string;
    leftIcon?: string;
    rightIcon?: string;
  };
  maxLength?: number;
  onKeyPress?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  dataTestid?: string;
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
      required,
      classes,
      onKeyUp,
      maxLength,
      onKeyPress,
      min,
      max,
      onFocus,
      onBlur,
      dataTestid,
    },
    ref,
  ) => {
    return (
      <div className={classNames(styles.textFieldWrapper, classes?.root)}>
        {label && (
          <label
            className={classNames(styles.textFieldPlaceholder, classes?.label)}
            htmlFor={label}
          >
            {label}
          </label>
        )}

        {leftIcon && (
          <div className={classNames(styles.leftIcon, classes?.leftIcon)}>
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={label}
          data-testid={dataTestid}
          maxLength={maxLength}
          className={classNames(
            {
              [styles.textField]: true,
              [styles.textFieldWithLeftIcon]: !!leftIcon,
              [styles.textFieldWithRightIcon]: !!rightIcon,
              [styles.textFieldError]: error,
            },
            classes?.input,
          )}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onKeyUp={onKeyUp}
          disabled={disabled}
          placeholder={placeholder}
          required={required}
          onKeyPress={onKeyPress}
          min={min}
          max={max}
          onFocus={onFocus}
          autoComplete={"off"}
          onBlur={onBlur}
          contentEditable="true"
        />

        {!!error && <p className={styles.errorMessage}>{error}</p>}

        {rightIcon && (
          <div className={classNames(styles.rightIcon, classes?.rightIcon)}>
            {rightIcon}
          </div>
        )}
      </div>
    );
  },
);
