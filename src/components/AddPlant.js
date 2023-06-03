/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from 'utils/BackendUrl';
import plants from 'reducers/plants';

export const AddPlant = () => {
  const [plantname, setPlantname] = useState('');
  const [species, setSpecies] = useState('');

  // dispatch to put access token into main component
  const dispatch = useDispatch();

  // get accessToken from store
  const accessToken = useSelector((store) => store.user.accessToken);

  const onFormSubmit = (event) => {
    // form not to reload page
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      // eslint-disable-next-line object-shorthand
      body: JSON.stringify({ plantname: plantname, species: species })
    };
    fetch(API_URL('addplant'), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(plants.actions.setPlantname(data.response.plantname));
          dispatch(plants.actions.setSpecies(data.response.species));
          dispatch(plants.actions.setPlantId(data.response._id))
          dispatch(plants.actions.setBirthday(data.response.birthday));
          dispatch(plants.actions.setLastWatered(data.response.lastWatered));
          dispatch(plants.actions.setLastSoilChange(data.response.lastSoilChange));
          dispatch(plants.actions.setError(null));
        } else {
          dispatch(plants.actions.setPlantname(null));
          dispatch(plants.actions.setSpecies(null));
          dispatch(plants.actions.setError(data.response))
        }
      })
      .then(
        setPlantname(''),
        setSpecies('')
      )
  }
  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="plantname"> Name of your plant baby </label>
      <input
        type="text"
        id="plantname"
        value={plantname}
        onChange={(e) => setPlantname(e.target.value)} />
      <label htmlFor="species"> Species </label>
      <input
        type="text"
        id="species"
        value={species}
        onChange={(e) => setSpecies(e.target.value)} />
      <button type="submit"> Create Plant </button>
    </form>
  )
}
