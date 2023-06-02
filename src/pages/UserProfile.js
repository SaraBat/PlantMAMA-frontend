/* eslint no-underscore-dangle: ["error", { "allow": [ "_id"] }] */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import plants from 'reducers/plants';
import user from 'reducers/user';

export const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  // eslint-disable-next-line
  }, [accessToken]);
  const onLogoutClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(plants.actions.setItems([]));
    navigate('/')
  };
  const onGoToGardenButtonClick = () => {
    navigate('garden');
  };
  return (
    <div>
      <button
        type="button"
        onClick={onLogoutClick}> Log Out
      </button>
      <h1> {username} </h1>
      <p> Bio </p>
      <image alt="user" />
      <button type="button" onClick={onGoToGardenButtonClick}> Go to Garden </button>
    </div>
  )
}