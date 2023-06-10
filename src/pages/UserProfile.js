/* eslint-disable max-len */
/* eslint no-underscore-dangle: ["error", { "allow": [ "_id"] }] */
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import plants from 'reducers/plants';
import user from 'reducers/user';
import { ToDo } from './ToDo';

// Why is this component calling UserGarden API?

export const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const imageUrl = useSelector((store) => store.user.imageUrl);
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  // eslint-disable-next-line
  }, [accessToken]);
  const onLogoutClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setImageUrl(null));
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
  const onEditUserClick = () => {
    navigate(`/${username}/editUser`);
  };

  return (
    <div>
      <div>
        <img className="profile-picture" src={imageUrl} alt="profile" />
        <h1> {username} </h1>
        <p> City </p>
        <p> Level </p>
        <p> Number of Plants </p>
        <p> There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don look even slightly believable.  </p>
        <button
          type="button"
          onClick={onEditUserClick}> Edit User
        </button>
      </div>
      <div>
        <ToDo />
      </div>
      <button type="button" onClick={onGoToGardenButtonClick}> Go to my Garden </button>
      <button type="button" onClick={onGoToDatabaseButtonClick}> See plant database </button>
      <button
        type="button"
        onClick={onLogoutClick}> Log Out
      </button>
    </div>
  )
}