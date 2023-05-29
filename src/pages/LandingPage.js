import React from 'react';
import { useNavigate } from 'react-router-dom';

export const LandingPage = () => {
  const navigate = useNavigate();
  const onRegisterButtonClick = () => {
    navigate('/register');
  };
  const onLoginButtonClick = () => {
    navigate('/login');
  }
  return (
    <div>
      <button type="button" onClick={onRegisterButtonClick}> Register </button>
      <button type="button" onClick={onLoginButtonClick}> Login </button>
    </div>
  )
}