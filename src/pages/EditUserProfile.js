/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/BackendUrl';
import user from 'reducers/user';

export const EditUserProfile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const baseUsername = useSelector((store) => store.user.username);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  // dispatch to put access token into main component
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate(-1);
  };

  const onFormSubmit = (event) => {
    // form not to reload page
    event.preventDefault();
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({ username, email })
    };
    fetch(API_URL(`${baseUsername}`), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // eslint-disable-next-line max-len
        { username ? dispatch(user.actions.setUsername(username)) : console.log('no change') }
        { email ? dispatch(user.actions.setEmail(email)) : console.log('no change') }
        navigate(-1);
        console.log('dispatch sent');
      });
  }
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="username"> New username </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="species"> New email </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
        <button type="submit"> Submit </button>
      </form>
      <button
        type="button"
        onClick={onBackClick}> Back
      </button>
    </>
  )
}