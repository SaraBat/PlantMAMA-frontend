/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/BackendUrl';
import user from 'reducers/user';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // responsible for login
  const mode = 'login';
  // dispatch to put access token into main component
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onGoToRegistrationButtonClick = () => {
    navigate('/register');
  };

  const onBackClick = () => {
    navigate(-1);
  }
  // get accessToken from store
  const accessToken = useSelector((store) => store.user.accessToken);
  useEffect(() => {
    if (accessToken) {
      navigate(`/${username}`)
    }
  // eslint-disable-next-line
  }, [accessToken]);
  const onFormSubmit = (event) => {
    // form not to reload page
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // eslint-disable-next-line object-shorthand
      body: JSON.stringify({ username: username, email: email, password: password })
    };
    fetch(API_URL(mode), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setAccessToken(data.response.accessToken));
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setEmail(data.response.email));
          dispatch(user.actions.setUserId(data.response.id));
          dispatch(user.actions.setError(null));
        } else {
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setEmail(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setError(data.response));
        }
      })
  }
  return (
    <>
      <button
        type="button"
        onClick={onGoToRegistrationButtonClick}> Not a plant parent yet? Register here
      </button>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="email"> Email </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password"> Password </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <button
        type="button"
        onClick={onBackClick}> Back
      </button>
    </>
  )
}
