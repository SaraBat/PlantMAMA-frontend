/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { API_URL } from 'utils/BackendUrl';
import plants from 'reducers/plants';

export const Login = () => {
  const [plantname, setPlantname] = useState('');
  const [species, setSpecies] = useState('');
  // responsible for login
  const mode = 'login';
  // dispatch to put access token into main component
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get accessToken from store
  const accessToken = useSelector((store) => store.user.accessToken);

  const onFormSubmit = (event) => {
    // form not to reload page
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      // eslint-disable-next-line object-shorthand
      body: JSON.stringify({ plantname: { plantname }, species: { species } })
    };
    fetch(API_URL(mode), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data)
          dispatch(plants.actions.setAccessToken(data.response.accessToken));
          dispatch(plants.actions.setPlantname(data.response.plantname));
          dispatch(plants.actions.setEmail(data.response.species));
          dispatch(plants.actions.setError(null));
        } else {
          dispatch(plants.actions.setAccessToken(null));
          dispatch(plants.actions.setUsername(null));
          dispatch(plants.actions.setEmail(null));
          dispatch(plants.actions.setUserId(null));
          dispatch(plants.actions.setError(data.response))
        }
      })
  }
  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="plantname"> Username </label>
      <input
        type="text"
        id="plantname"
        value={plantname}
        onChange={(e) => setPlantname(e.target.value)} />
      <label htmlFor="species"> Species </label>
      <input
        type="species"
        id="species"
        value={species}
        onChange={(e) => setSpecies(e.target.value)} />
      <button type="submit"> Create Plant </button>
    </form>
  )
}
