/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/BackendUrl';
import user from 'reducers/user';
import '../styling/EditUserProfile.css'

export const EditUserProfile = () => {
  const fileInput = useRef();
  const accessToken = useSelector((store) => store.user.accessToken);
  const baseUsername = useSelector((store) => store.user.username);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [level, setLevel] = useState('');
  const [bio, setBio] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // dispatch to put access token into main component
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  });

  const onFormSubmit = (event) => {
    // form not to reload page
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', username)
    formData.append('email', email)
    formData.append('city', city)
    formData.append('level', level)
    formData.append('bio', bio)
    formData.append('image', fileInput.current.files[0])
    const options = {
      method: 'PATCH',
      headers: {
        Authorization: accessToken
      },
      body: formData
    };
    const url = API_URL(`${baseUsername}`);
    const request = new Request(url, options);
    fetch(request)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // eslint-disable-next-line max-len
        { username ? dispatch(user.actions.setUsername(username)) : console.log('no change') }
        { email ? dispatch(user.actions.setEmail(email)) : console.log('no change') }
        { city ? dispatch(user.actions.setCity(city)) : console.log('no change') }
        { level ? dispatch(user.actions.setLevel(level)) : console.log('no change') }
        { bio ? dispatch(user.actions.setBio(bio)) : console.log('no change') }
        { imageUrl ? dispatch(user.actions.setImageUrl(imageUrl)) : console.log('no change') }
        console.log('dispatch sent');
        navigate(-1);
      });
  }
  const onDeleteUserClick = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    // eslint-disable-next-line space-unary-ops
    fetch(API_URL(`${baseUsername}`), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(user.actions.deleteUser());
        navigate('/')
      });
  };
  return (
    <div className="editUserProfile">
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          id="city"
          placeholder="Your city"
          value={city}
          onChange={(e) => setCity(e.target.value)} /><br /><br />
        <input
          type="text"
          id="level"
          placeholder="Plant Proficiency Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)} /><br /><br />
        <input
          type="file"
          id="imageUrl"
          placeholder="Add profile picture"
          ref={fileInput}
          onChange={(e) => setImageUrl(e.target.files[0])} /><br /><br />
        <input
          type="text"
          id="bio"
          placeholder="Biography"
          value={bio}
          onChange={(e) => setBio(e.target.value)} /><br /><br />
        <input
          type="text"
          id="username"
          placeholder="Change username"
          value={username}
          onChange={(e) => setUsername(e.target.value)} /><br /><br />
        <input
          type="email"
          id="email"
          placeholder="Change email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <button type="submit"> Submit </button>
      </form>
      <button
        className="on-delete-user-button"
        type="button"
        onClick={onDeleteUserClick}> Delete User
      </button>
    </div>
  )
}