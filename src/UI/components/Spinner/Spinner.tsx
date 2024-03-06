import React from 'react';
import classNames from "classnames";

import styles from './Spinner.module.scss'

interface Props {
    size?: 'small' | 'big'
    button?: boolean
}

export const Spinner: React.FC<Props> = ({ size = 'big', button = false }) => {
    return (
        <div className={styles.spinnerContainer}>
            <div className={classNames(size === 'small' && styles.spinnerSmall, size === 'big' && styles.spinner, button && styles.spinnerButton, !button && styles.spinnerCommon)} />
        </div>
    );
};