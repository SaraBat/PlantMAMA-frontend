import { SinglePlantSpecies } from 'components/SinglePlantSpecies';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export const PlantSpecies = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate(-1);
  }

  return (
    <section>
      <SinglePlantSpecies id={id} />
      <button
        type="button"
        onClick={onBackClick}> Back
      </button>
    </section>
  )
}
