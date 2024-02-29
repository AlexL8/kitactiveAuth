import { RegistrationForm } from '@src/components/RegistrationForm';
import { PAGES_CONFIG } from '@src/constants/pages';
import { useCurrentUser } from '@src/hooks/useCurrentUser';
import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Registration = () => {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();

  if (currentUser.data) return <Navigate to={PAGES_CONFIG.dashboard.route} />;

  return (
    <RegistrationForm toLogin={() => navigate(PAGES_CONFIG.login.route)} />
  );
};

export default Registration;
