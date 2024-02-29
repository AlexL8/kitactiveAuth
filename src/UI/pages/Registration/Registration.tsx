import React from 'react';
import {useStore} from "../../../Core/store";
import {useDispatch} from "react-redux";
import styles from './style.module.scss';
import { Form } from 'formik';

export const Registration = () => {
    const dispatch = useDispatch()
    const { asyncActions } = useStore((store) => ({
        User: store.UserEntity
    }))
    

    const onClick = () => {
        // @ts-ignore
        dispatch(asyncActions.User.registration({email: 'ddsa', password: '1234', name: 'dima'}))
    }

  return (
    <div className={styles.registration}>
      <div className={styles.registrationHeader}>
        <h1 className={styles.registrationTtile}>Sign up to Service</h1>
        <div className={styles.registrationSubTitle}>Quick & Simple way to Automate your smth.</div>
        <Form/>
      </div>

    </div>
  );
};
