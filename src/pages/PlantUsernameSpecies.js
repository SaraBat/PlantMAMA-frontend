import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { REACT_APP_PLANT_API_KEY } from 'utils/BackendUrl';
import { SinglePlantSpecies } from 'components/SinglePlantSpecies';

export const PlantUsernameSpecies = () => {
  const { plantusernamespecies } = useParams();
  console.log(plantusernamespecies)
  const navigate = useNavigate();
  const [plantSpeciesList, setPlantSpeciesList] = useState([]);
  const onBackClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    fetch(`https://perenual.com/api/species-list?key=${REACT_APP_PLANT_API_KEY}&q=${plantusernamespecies}`)
    // https://perenual.com/api/species-list?key=[YOUR-API-KEY]&q=monstera
      .then((response) => response.json())
      .then((data) => setPlantSpeciesList(data.data))
      .catch((e) => console.log(e))
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
      <button
        type="button"
        onClick={onBackClick}> Back
      </button>
    </section>
  )
}