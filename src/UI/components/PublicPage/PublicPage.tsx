import React from "react";
import styles from './style.module.scss';

interface Props {
    children: React.ReactNode;
}

export const PublicPage: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.publicPage}>
            <div className={styles.publicPageContent}>
                <div>{children}</div>
            </div>
            <div className={styles.footer}>© 2021. - 2025 All Rights Reserved.</div>
        </div>
    )
}
// обёртка