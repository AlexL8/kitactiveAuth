import React from 'react';
import styles from './NotFound.module.scss';
import {Link} from "react-router-dom";


export const NotFound = () => {
    return (
        <div className={styles.notfound}>
            <h1 className={styles.title}>404 Error</h1>
			<h2 className={styles.subTitle}>Sorry... Page not found.</h2>
            <Link className={styles.link} to='/login'>go to login page</Link>
        </div>
    );
};
