/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_PLANT_API_KEY } from 'utils/BackendUrl';
import { Loading } from 'components/Loading';

export const PlantList = ({ param }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
      .then((data) => {
        setPlantSpeciesList((data.data));
        setLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(plantSpeciesList);

  if (loading) return (<Loading />);
  return (
    <div>
      {plantSpeciesList.map((singleSpecies) => {
        return (
          <div>
            <div key={singleSpecies.id}>
              <button
                onClick={() => { navigate(`/plantdatabase/${singleSpecies.id}`) }}
                type="button">
                {singleSpecies.common_name}
              </button>
            </div>

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
