/* eslint-disable max-len */
/* eslint no-underscore-dangle: ["error", { "allow": [ "_id"] }] */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import plants from 'reducers/plants';
import user from 'reducers/user';
import { API_URL } from 'utils/BackendUrl';
import { Loading } from 'components/Loading';
import { ToDo } from './ToDo';

export const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  // const city = useSelector((store) => store.user.city);
  // const level = useSelector((store) => store.user.level);
  // const bio = useSelector((store) => store.user.bio);
  // const imageUrl = useSelector((store) => store.user.imageUrl);

  const [city, setCity] = useState('');
  const [level, setLevel] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  console.log(imageUrl);

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

  const onGoToGardenButtonClick = () => {
    navigate('garden');
  };
  const onEditUserClick = () => {
    navigate(`/${username}/editUser`);
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL(`${username}`), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setCity(data.body.city)
        setLevel(data.body.level)
        setBio(data.body.bio)
        setImageUrl(data.body.imageUrl)
        setLoading(false)
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (loading) return (<Loading />);
  return (
    <div>
      <div>
        <img className="profile-picture" src={imageUrl} alt="profile" />
        <p> {username} </p>
        {city ? <p> 📍 {city} </p> : null}
        {level ? <p> 🪴 proficiency: {level} </p> : null}
        <p> {bio} </p>
        <button
          type="button"
          onClick={onEditUserClick}> Edit User
        </button>
      </div>
      <div>
        <ToDo />
      </div>
      <button type="button" onClick={onGoToGardenButtonClick}> Go to my Garden </button>
      <button
        type="button"
        onClick={onLogoutClick}> Log Out
      </button>
    </div>
  )
}