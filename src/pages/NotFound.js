import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export const NotFound = () => {
  const navigate = useNavigate();
  const onNotFoundButtonClick = () => {
    navigate('/');
  };
  return (
    <div>
      <button type="button" onClick={onNotFoundButtonClick}> Back to homepage </button>
      <p>
        <Link to="/login"> Go to Login</Link>
      </p>
    </div>
  );
};