import React from 'react'
import {Navigate} from "react-router-dom";
import {PAGES_CONFIG} from "../../../constants/pages";
import {getAuthToken} from "../../../utils/auth";
import styles from './PrivatePage.module.scss';
import {useDispatch} from "../../../hooks/useDispatch";
import {useStore} from "../../../Core/store";

interface Props {
    children: React.ReactNode
}

const Layout:  React.FC<Props> = ({ children }) => {
    const dispatch = useDispatch();
    const { asyncActions } = useStore((store) => ({
        User: store.UserEntity
    }))
    return (
        <div className={styles.layout}>
            <div className={styles.headerLayout}>
                <div className={styles.headerLayoutContainer}>
                    <button onClick={() => console.log()} className={styles.headerLayoutBtn}>LOG OUT</button>
                </div>
            </div>
            {children}
        </div>
    )
}

export const PrivateRoute: React.FC<Props> = ({ children }) => {
    if (!getAuthToken()) return <Navigate to={PAGES_CONFIG.login.route} />;

    return (
      <Layout>{children}</Layout>
    )
}
