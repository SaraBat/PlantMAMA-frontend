import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SinglePlantSpecies } from 'components/SinglePlantSpecies';

export const PlantUsernameSpecies = () => {
  const { plantusernamespecies } = useParams();
  const [plantSpeciesList, setPlantSpeciesList] = useState([]);
  useEffect(() => {
    fetch(`https://perenual.com/api/species-list?key=sk-uzEu646b489704d0e1015&q=${plantusernamespecies}`)
      .then((response) => response.json())
      .then((data) => setPlantSpeciesList(data.data))
  }, [plantusernamespecies]);
  console.log(plantSpeciesList);
  const ids = [];
  for (let i = 0; i < plantSpeciesList.length; i += 1) {
    ids.push(plantSpeciesList[i].id);
  }
  console.log(ids);
  const id = ids[0];
  console.log(id);
  return (
    <section>
      <SinglePlantSpecies id={id} />
    </section>
  )
}

// missing plant image - need to access object
// missing sunlight - need to access array

/*  useEffect(() => {
    plantSpeciesList.map((singlePlant) => {
        const { id } = singlePlant.id;
        fetch(`https://perenual.com/api/species/details/${id}?key=sk-uzEu646b489704d0e1015`)
          .then((response) => response.json())
          .then((data) => setSingleSpeciesOfPlant(data))
        return (singleSpeciesOfPlant)
      })
    }, [plantSpeciesList, singleSpeciesOfPlant]);
*/

/*
      <div key={plantSpecies.id}>
        <h1>{plantSpecies.common_name} </h1>
        <p>Cycle: {plantSpecies.cycle}</p>
        <p>Watering: {plantSpecies.watering}</p>
      </div>
      <button type="button" onClick={onGoBackButtonClick}> Back </button>
      */