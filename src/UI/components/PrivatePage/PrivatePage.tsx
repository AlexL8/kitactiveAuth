import React from 'react'
import {Navigate} from "react-router-dom";
import {PAGES_CONFIG} from "../../../constants/pages";
import {getAuthToken} from "../../../utils/auth";

interface Props {
    children: React.ReactNode
}

const Layout:  React.FC<Props> = ({ children }) => {
    return (
        <div>
            <h1>Об</h1>
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
