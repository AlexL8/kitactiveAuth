import React from 'react';
import styles from './Login.module.scss';
import { SigninForm } from '../../components/SigninForm/SigninForm';

export const Login = () => {
  return (
    <div className={styles.registration}>
      <div className={styles.registrationHeader}>
        <h1 className={styles.registrationTitle}>Log In to Service</h1>
        <div className={styles.registrationSubTitle}>Quick & Simple way to Automate your smth.</div>
      </div>
        <SigninForm/>
    </div>
  );
};
