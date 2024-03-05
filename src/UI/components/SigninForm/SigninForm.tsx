import React, {useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // импортируем Yup для валидации
import { AuthTextField } from '../AuthTextField/AuthTextField';
import {useStore} from "../../../Core/store";
import styles from './SigninForm.module.scss';
import { useDispatch } from '../../../hooks/useDispatch';
import { PAGES_CONFIG } from '../../../constants/pages';
import { useNavigate } from 'react-router-dom';

export const SigninForm = () => {
    const dispatch = useDispatch()
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
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
    }),
    onSubmit: values => {
        dispatch(asyncActions.User.login({ email: values.email, password: values.password }))
    },
  });
  
  return (
    <form className={styles.signinForm} onSubmit={formik.handleSubmit}>
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
        <div className={styles.signinFormBtnWrapper}>
          <button className={styles.signinFormBtn}  type="submit">PROCEED</button>
          <div className={styles.signinFormText}>Or</div>
          <button className={styles.signinFormBtn} type="submit" onClick={() => navigate(PAGES_CONFIG.registration.route)}>SIGN UP</button>
        </div>
    </form>
  );
};