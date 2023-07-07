/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from 'utils/BackendUrl';
import plants from 'reducers/plants';
import '../styling/Garden.css'

export const AddPlant = () => {
  const [plantname, setPlantname] = useState('');
  const plantItems = useSelector((store) => store.plants.items);
  const [species, setSpecies] = useState('');

  // dispatch to put access token into main component
  const dispatch = useDispatch();

  // get accessToken from store
  const accessToken = useSelector((store) => store.user.accessToken);

  // function that takes a new plant as a param and updates the state of the plants
  // array using spread operator. it creates a new array with the existing plants
  // and the new plant added to it.
  const handleAddPlant = (newPlant) => {
    dispatch(plants.actions.setItems([...plantItems, newPlant]));
  };

  const onFormSubmit = (event) => {
    // form not to reload page
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({ plantname, species })
    };
    fetch(API_URL('addplant'), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // creating a new plant-object with data based on the plant-schema:
          const newPlant = {
            _id: data.response.plants._id,
            plantname,
            species,
            birthday: data.response.plants.birthday,
            lastWatered: data.response.plants.lastWatered,
            lastSoilChange: data.response.plants.lastSoilChange,
            imageUrl: data.response.plants.imageUrl
          };
          dispatch(plants.actions.setError(null));
          // calling the handleAddPlant-function with the newPlant-object
          // as an argument, comprised of all the data the user passed in themselves
          handleAddPlant(newPlant);
        } else {
          // dispatching error message if plant object wasn't successfully created
          dispatch(plants.actions.setError(data.response));
        }
      })
      // emptying the form when the new plant has been added
      .then(() => {
        setPlantname('');
        setSpecies('');
      });
  };

  return (
    <div className="addplant-div">
      <h1 className="garden-title-font"> Add Plant </h1>
      <form className="addplant-form" onSubmit={onFormSubmit}>
        <input
          type="text"
          id="plantname"
          placeholder="Name of plant baby"
          value={plantname}
          onChange={(e) => setPlantname(e.target.value)} />
        <input
          type="text"
          id="species"
          placeholder="Plant species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)} />
        <button className="addplant-btn" type="submit">Add plant</button>
      </form>
    </div>
  )
}
