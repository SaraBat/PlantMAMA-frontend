import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { REACT_APP_PLANT_API_KEY } from 'utils/BackendUrl';
import { SinglePlantSpecies } from 'components/SinglePlantSpecies';
import { useSelector } from 'react-redux';

export const PlantUsernameSpecies = () => {
  const { plantusernamespecies } = useParams();
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  });
  const [plantSpeciesList, setPlantSpeciesList] = useState([]);
  useEffect(() => {
    fetch(`https://perenual.com/api/species-list?key=${REACT_APP_PLANT_API_KEY}&q=${plantusernamespecies}`)
    // https://perenual.com/api/species-list?key=[YOUR-API-KEY]&q=monstera
      .then((response) => response.json())
      .then((data) => setPlantSpeciesList(data.data))
      .catch((e) => console.log(e))
  }, [plantusernamespecies]);
  const ids = [];
  for (let i = 0; i < plantSpeciesList.length; i += 1) {
    ids.push(plantSpeciesList[i].id);
  }
  const id = ids[0];
  return (
    <section>
      <SinglePlantSpecies id={id} />
    </section>
  )
}