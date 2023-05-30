import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const PlantUsernameSpecies = () => {
  const { plantusernamespecies } = useParams();
  const navigate = useNavigate();
  const onGoBackButtonClick = () => {
    navigate(-1);
  };
  const [plantSpeciesList, setPlantSpeciesList] = useState([]);
  const [singleSpeciesOfPlant, setSingleSpeciesOfPlant] = useState([]);
  useEffect(() => {
    fetch(`https://perenual.com/api/species-list?key=sk-uzEu646b489704d0e1015&q=${plantusernamespecies}`)
      .then((response) => response.json())
      .then((data) => setPlantSpeciesList(data.data))
  }, [plantusernamespecies]);
  console.log(plantSpeciesList);
  useEffect(() => {
    plantSpeciesList.map((singlePlant) => {
      const { id } = singlePlant.id;
      fetch(`https://perenual.com/api/species/details/${id}?key=sk-uzEu646b489704d0e1015`)
        .then((response) => response.json())
        .then((data) => setSingleSpeciesOfPlant(data))
      return (singleSpeciesOfPlant)
    })
  }, [plantSpeciesList, singleSpeciesOfPlant]);

  return (
    <section>
      <p>lalalala </p>
      <section>
        <div key={singleSpeciesOfPlant.id}>
          <h1>{singleSpeciesOfPlant.common_name} </h1>
          <p>Cycle: {singleSpeciesOfPlant.cycle}</p>
          <p>Watering: {singleSpeciesOfPlant.watering}</p>
        </div>
      </section>
      <button type="button" onClick={onGoBackButtonClick}> Back </button>
    </section>
  )
}

// missing plant image - need to access object
// missing sunlight - need to access array

/*
      <div key={plantSpecies.id}>
        <h1>{plantSpecies.common_name} </h1>
        <p>Cycle: {plantSpecies.cycle}</p>
        <p>Watering: {plantSpecies.watering}</p>
      </div>
      <button type="button" onClick={onGoBackButtonClick}> Back </button>
      */