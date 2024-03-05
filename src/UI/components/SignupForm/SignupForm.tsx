import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // импортируем Yup для валидации
import { AuthTextField } from '../AuthTextField/AuthTextField';
import {useDispatch} from "react-redux";
import {useStore} from "../../../Core/store";
import { AppThunkDispatch } from '../../../Core/types';
import styles from './SignupForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { PAGES_CONFIG } from '../../../constants/pages';

export const SignupForm = () => {
    const dispatch = useDispatch<AppThunkDispatch>()
    const { asyncActions } = useStore((store) => ({
        User: store.UserEntity
    }))

  const navigate = useNavigate();
  const [isVisible, setVisible] = useState(false)
  const formik = useFormik({
    initialValues: {
      firstName: '',
      password: '',
      email: '',
    },
    validationSchema: Yup.object({ // определяем схему валидации
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: values => {
        dispatch(asyncActions.User.registration({ email: values.email, password: values.password, name: values.firstName }))
    },
  });
  
  return (
    <form className={styles.signupForm} onSubmit={formik.handleSubmit}>
        <AuthTextField
            type='text'
            name='firstName'
            placeholder='Enter your firstName...'
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.errors.firstName}
        />
        <AuthTextField
            type='text'
            name='email'
            placeholder='Enter your email...'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.errors.email}
        />
        <AuthTextField
            type={isVisible ? "text" : "password"}
            name='password'
            placeholder='Enter your password...'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.errors.password}
            rightIcon={
                <button type='button' className={styles.showPasswordBtn} onClick={() => setVisible(!isVisible)}></button>
            }
        />
        <div className={styles.signupFormBtnWrapper}>
          <button className={styles.signupFormBtn} type="submit">CREATE AN ACCOUNT</button>
          <div className={styles.signupFormText}>Or</div>
          <button className={styles.signupFormBtn} type="submit" onClick={() => navigate(PAGES_CONFIG.login.route)}>LOG IN</button>
        </div>
    </form>
  );
};