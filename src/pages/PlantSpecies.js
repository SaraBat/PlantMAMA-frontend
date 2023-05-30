import { SinglePlantSpecies } from 'components/SinglePlantSpecies';
import React from 'react';
import { useParams } from 'react-router-dom';

export const PlantSpecies = () => {
  const { id } = useParams();
  return (
    <section>
      <SinglePlantSpecies id={id} />
    </section>
  )
}
