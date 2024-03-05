import React from 'react';
import styles from './Registration.module.scss';
import { SignupForm } from '../../components/SignupForm/SignupForm';

export const Registration = () => {
  return (
    <div className={styles.registration}>
      <div className={styles.registrationHeader}>
        <h1 className={styles.registrationTitle}>Sign up to Service</h1>
        <div className={styles.registrationSubTitle}>Quick & Simple way to Automate your smth.</div>
      </div>
        <SignupForm/>
    </div>
  );
};
