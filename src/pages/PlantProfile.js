import React from 'react';
import { useNavigate } from 'react-router-dom';

export const PlantProfile = () => {
  const navigate = useNavigate();
  const onGoToPlantSpeciesButtonClick = () => {
    navigate('/:plantspecies');
  };
  return (
    <div>
      <h1>Plant name</h1>
      <h2> Plant species </h2>
      <button type="button" onClick={onGoToPlantSpeciesButtonClick}> link to plant species page </button>
      <h3> Birthday </h3>
      <h3> Last watered </h3>
      <h3> Last soil change </h3>
      <image alt="plant"> Plant profile picture </image>
    </div>
  )
}