import { LoginForm } from '@src/components/LoginForm';
import { PAGES_CONFIG } from '@src/constants/pages';
import { useCurrentUser } from '@src/hooks/useCurrentUser';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  if (currentUser.data) return <Navigate to={PAGES_CONFIG.dashboard.route} />;

  return (
    <LoginForm
      toRegistration={() => navigate(PAGES_CONFIG.registration.route)}
      toResetPassword={() => navigate(PAGES_CONFIG.forgotPassword.route)}
    />
  );
}
