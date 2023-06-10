/* eslint-disable no-unused-expressions */
/* eslint-disable no-lone-blocks */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/BackendUrl';
import user from 'reducers/user';

export const EditUserProfile = () => {
  const fileInput = useRef();
  const accessToken = useSelector((store) => store.user.accessToken);
  const baseUsername = useSelector((store) => store.user.username);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  // dispatch to put access token into main component
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate(-1);
  };

  const onFormSubmit = (event) => {
    // form not to reload page
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', username)
    formData.append('email', email)
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
        { imageUrl ? dispatch(user.actions.setImageUrl(imageUrl)) : console.log('no change') }
        navigate(-1);
        console.log('dispatch sent');
        console.log('imgURl:', imageUrl);
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
        <label htmlFor="imageUrl"> New profile picture </label>
        <input
          type="file"
          id="imageUrl"
          placeholder="Add profile picture"
          ref={fileInput}
          onChange={(e) => setImageUrl(e.target.files[0])} /><br /><br />
        <button type="submit"> Submit </button>
      </form>
      <button
        type="button"
        onClick={onDeleteUserClick}> Delete User
      </button>
      <button
        type="button"
        onClick={onBackClick}> Back
      </button>
    </>
  )
}