import React from 'react';
import styles from './NotFound.module.scss';

export const NotFound = () => {
    return (
        <div className={styles.notfound}>
            <h1 className={styles.title}>404 Error</h1>
			<h2 className={styles.subTitle}>Sorry... Page not found.</h2>
        </div>
    );
};
