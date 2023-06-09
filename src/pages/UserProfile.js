/* eslint-disable max-len */
/* eslint no-underscore-dangle: ["error", { "allow": [ "_id"] }] */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { API_URL } from 'utils/BackendUrl';
import { Loading } from 'components/Loading';
import '../styling/UserProfile.css'

export const UserProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);

  const [city, setCity] = useState('');
  const [level, setLevel] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  // eslint-disable-next-line
  }, [accessToken]);

  const onGoToGardenButtonClick = () => {
    navigate('garden');
  };
  const onGoToTodoButtonClick = () => {
    navigate(`/${username}/todo`);
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
    <div className="main-container-user-profile">
      <div className="user-profile">
        <div className="pic-bio">
          <img className="profile-picture" src={imageUrl} alt="profile" />
        </div>
        <span className="user-text"> 👤 {username} </span>
        {city ? <span className="user-text"> 📍 {city} </span> : null}
        {level ? <span className="user-text">  🪴 {level} </span> : null}
        <button
          className="on-edit-user-button"
          type="button"
          onClick={onEditUserClick}> Edit Profile
        </button>
      </div>
      <div className="user-profile-buttons-bio">
        <div className="user-bio"> <p> {bio} </p> </div>
        <div className="user-profile-buttons">
          <button type="button" className="profilebutton" onClick={onGoToTodoButtonClick}> TO-DO LIST </button>
          <button type="button" className="profilebutton" onClick={onGoToGardenButtonClick}> GARDEN </button>
        </div>
      </div>
    </div>
  )
}