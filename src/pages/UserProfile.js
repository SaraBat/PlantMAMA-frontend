/* eslint-disable max-len */
/* eslint no-underscore-dangle: ["error", { "allow": [ "_id"] }] */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from 'utils/BackendUrl';
import plants from 'reducers/plants';
import user from 'reducers/user';

// Why is this component calling UserGarden API?

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
  const onGoToDatabaseButtonClick = () => {
    navigate('/plantdatabase');
  };
  const onGoToGardenButtonClick = () => {
    navigate('garden');
  };
  const onDeleteUserClick = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    // eslint-disable-next-line space-unary-ops
    fetch(API_URL(`${username}`), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(user.actions.deleteUser());
        navigate('/')
      });
  };
  return (
    <div>
      <h1> {username} </h1>
      <p> There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc. </p>
      <image alt="user" />
      <button type="button" onClick={onGoToGardenButtonClick}> Go to my Garden </button>
      <button type="button" onClick={onGoToDatabaseButtonClick}> See plant database </button>
      <button
        type="button"
        onClick={onLogoutClick}> Log Out
      </button>
      <button
        type="button"
        onClick={onDeleteUserClick}> Delete User
      </button>
    </div>
  )
}