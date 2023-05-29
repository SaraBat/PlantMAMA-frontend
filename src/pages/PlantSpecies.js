import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const PlantSpecies = () => {
  const navigate = useNavigate();
  const onGoBackButtonClick = () => {
    navigate(-1);
  };
// Link element needs to be brapped inside a map of plant api
  return (
    <section>
      <Link to={`/${plantid}`}>
        Create & Insert SinglePlantSpecies component here
      </Link>
      <button type="button" onClick={onGoBackButtonClick}> Back </button>
    </section>
  )
}