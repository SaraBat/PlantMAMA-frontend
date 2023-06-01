/* eslint no-underscore-dangle: ["error", { "allow": [ "_id"] }] */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import plants from 'reducers/plants';
import { API_URL } from 'utils/BackendUrl';
import user from 'reducers/user';

export const UserProfile = () => {
  const navigate = useNavigate();
  /*
  const onGoToGardenButtonClick = () => {
    navigate('/:username/garden');
  };

  <button type="button" onClick={onGoToGardenButtonClick}> Go to Garden </button>
  */
  const plantItems = useSelector((store) => store.plants.items);
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  }, [accessToken]);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL('plants'), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(plants.actions.setError(null));
          dispatch(plants.actions.setItems(data.response))
        } else {
          dispatch(plants.actions.setError(data.response));
          dispatch(plants.actions.setItems([]))
        }
      });
  }, []);
  const onLogoutClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(plants.actions.setItems([]));
  };
  return (
    <div>
      <h1> Username </h1>
      <p> Bio </p>
      <image alt="user"> profile picture</image>

      <button
        type="button"
        onClick={onLogoutClick}> Log Out
      </button>
      {username ? (<h2> these are the thoughts of {username.toUpperCase()}</h2>) : ''}
      {plantItems ? (() => {
        plantItems.map((item) => {
          return (
            <p key={item._id}>
              {item.message}
            </p>
          )
        })
      }) : ''}
    </div>
  )
}