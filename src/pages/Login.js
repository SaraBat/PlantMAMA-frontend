/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/BackendUrl';
import user from 'reducers/user';
import '../styling/Login.css';
import Swal from 'sweetalert2';
import { Loading } from 'components/Loading';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // responsible for login
  const mode = 'login';
  // dispatch to put access token into main component
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onGoToRegistrationButtonClick = () => {
    navigate('/register');
  };

  // const onBackClick = () => {
  //   navigate(-1);
  // }
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
      body: JSON.stringify({ username: username, password: password })
    };
    setLoading(true);
    fetch(API_URL(mode), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(user.actions.setAccessToken(data.response.accessToken));
          dispatch(user.actions.setUsername(data.response.username));
          dispatch(user.actions.setUserId(data.response.id));
          dispatch(user.actions.setError(null));
        } else {
          Swal.fire(data.response);
          dispatch(user.actions.setAccessToken(null));
          dispatch(user.actions.setUsername(null));
          dispatch(user.actions.setEmail(null));
          dispatch(user.actions.setUserId(null));
          dispatch(user.actions.setError(data.response));
        }
      })
  }
  if (!loading) {
    return (
      <section className="login-section">
        <p>Happy to see you again!</p>
        <h1 className="login-title">Log in</h1>
        <div className="login-fields">
          <form onSubmit={onFormSubmit}>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            <button className="login-btn1" type="submit">Login</button>
          </form>
        </div>
        <div className="register-div">
          <p>You don't have an account?</p>
          <button
            className="register-btn1"
            type="button"
            onClick={onGoToRegistrationButtonClick}> Create one now!
          </button>
        </div>
      </section>
    )
  } else { return (<div> <Loading /></div>) }
}
