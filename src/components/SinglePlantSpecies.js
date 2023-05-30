import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SinglePlantSpecies = () => {
  const navigate = useNavigate();
  const onGoBackButtonClick = () => {
    navigate(-1);
  };
  const [plantSpecies, setPlantSpecies] = useState('');
  useEffect((id) => {
    fetch(`https://perenual.com/api/species/details/${id}?key=sk-uzEu646b489704d0e1015`)
      .then((response) => response.json())
      .then((data) => setPlantSpecies(data))
  }, []);
  // missing plant image - need to access object
  // missing sunlight - need to access array
  return (
    <div>
      <section>
        <div key={plantSpecies.id}>
          <h1>{plantSpecies.common_name} </h1>
          <p>Cycle: {plantSpecies.cycle}</p>
          <p>Watering: {plantSpecies.watering}</p>
        </div>
        <button type="button" onClick={onGoBackButtonClick}> Back </button>
      </section>
    </div>
  )
}