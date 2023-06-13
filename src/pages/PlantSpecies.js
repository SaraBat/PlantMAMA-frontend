import { SinglePlantSpecies } from 'components/SinglePlantSpecies';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

export const PlantSpecies = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  });

  return (
    <section>
      <SinglePlantSpecies id={id} />
    </section>
  )
}
