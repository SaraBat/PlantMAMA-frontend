import React from 'react';
import { useNavigate } from 'react-router-dom';

export const UserProfile = () => {
  const navigate = useNavigate();
  const onGoToGardenButtonClick = () => {
    navigate('/:username/garden');
  };
  return (
    <div>
      <h1> Username </h1>
      <p> Bio </p>
      <image alt="user"> profile picture</image>
      <button type="button" onClick={onGoToGardenButtonClick}> Register </button>
    </div>
  )
}