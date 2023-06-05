/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from 'utils/BackendUrl';
import plants from 'reducers/plants';

export const EditPlantProfile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const { plantId } = useParams();
  const [plantname, setPlantname] = useState('');
  const [species, setSpecies] = useState('');
  const [birthday, setBirthday] = useState('');
  // dispatch to put access token into main component
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(plantId);
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
      body: JSON.stringify({ plantname, species, birthday })
    };
    fetch(API_URL(`${username}/garden/${plantId}`), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(plantId);
        console.log(plantname);
        console.log(species);
        console.log(birthday);
        navigate(-2)
        // eslint-disable-next-line max-len
        dispatch(plants.actions.editSinglePlant({ plantId: plantId, plantname: plantname, species: species, birthday: birthday }));
        console.log('dispatch sent');
        dispatch(plants.actions.setError(null));
      });
  }
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="plantnamee"> New plantname </label>
        <input
          type="text"
          id="plantname"
          value={plantname}
          onChange={(e) => setPlantname(e.target.value)} />
        <label htmlFor="species"> New species </label>
        <input
          type="text"
          id="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)} />
        <label htmlFor="birthday"> Add birthday </label>
        <input
          type="birthday"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)} />
        <button type="submit"> Submit </button>
      </form>
      <button
        type="button"
        onClick={onBackClick}> Back
      </button>
    </>
  )
}