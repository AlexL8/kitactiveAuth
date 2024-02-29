import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'; // импортируем Yup для валидации
import { AuthTextField } from '../AuthTextField/AuthTextField';

const SignupForm = () => {
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
      alert(JSON.stringify(values, null, 2));
    },
  });
  
  return (
    <form onSubmit={formik.handleSubmit}>
      <AuthTextField 
		type='text'
		name='login'
		placeholder='Enter your name...'
		value={formik.values.firstName}
		onChange={formik.handleChange}
		dataTestid={'sign-in-input-login'}
	  />
      <label htmlFor="password">Password</label>
      <input
        id="password"
        name="password"
        type="password" // изменено на type="password" для скрытия введенных символов
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}
      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;