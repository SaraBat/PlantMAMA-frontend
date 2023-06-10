import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { REACT_APP_PLANT_API_KEY } from 'utils/BackendUrl';
import { Loading } from 'components/Loading';

export const PlantList = ({ param }) => {
  const navigate = useNavigate();
  const onBackClick = () => {
    navigate(-1);
  }
  console.log(param);
  const pageNumber = Math.floor(Math.random() * (23 - 1 + 1)) + 1;

  const [plantSpeciesList, setPlantSpeciesList] = useState([]);
  useEffect(() => {
    fetch(`https://perenual.com/api/species-list?page=${pageNumber}&key=${REACT_APP_PLANT_API_KEY}${param}`)
      .then(console.log(param))
      .then(console.log(pageNumber))
      .then((response) => response.json())
      .then(console.log(param))
      .then((data) => setPlantSpeciesList((data.data)))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(plantSpeciesList);

  if (!plantSpeciesList) return (<div> <Loading /> </div>)
  return (
    <div>
      {plantSpeciesList.map((singleSpecies) => {
        return (
          <div key={singleSpecies.id}>
            <Link to={`/plantdatabase/${singleSpecies.id}`}> Learn more about {singleSpecies.common_name}  </Link>
          </div>
        )
      })}
      <button
        type="button"
        onClick={onBackClick}> Back
      </button>
    </div>
  )
}