import React from 'react';
import { useNavigate } from 'react-router-dom';
import hands from '../assets/hands.png';
import hand from '../assets/hand.png';
import '../styling/LandingPage.css'

export const LandingPage = () => {
  const navigate = useNavigate();
  const onRegisterButtonClick = () => {
    navigate('/register');
  };
  const onLoginButtonClick = () => {
    navigate('/login');
  }
  return (
    <div className="landing-main-container">
      <div className="landing-button-div">
        <h1 className="landing-title"> THE BEST ALLY FOR THE CARE OF YOUR PLANTS</h1>
        <button className="landing-button" type="button" onClick={onRegisterButtonClick}> Register </button>
        <button className="landing-button" type="button" onClick={onLoginButtonClick}> Login </button>
      </div>
      <div className="hands-image-div">
        <img src={hands} className="hands-image" alt="hands" />
        <img src={hand} className="hand-image" alt="hand" />
      </div>
    </div>
  )
}