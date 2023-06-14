/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_PLANT_API_KEY } from 'utils/BackendUrl';
import { Loading } from 'components/Loading';
import '../styling/plantdatabase.css';

export const PlantList = ({ param }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const pageNumber = Math.floor(Math.random() * (12 - 1 + 1)) + 1;

  const [plantSpeciesList, setPlantSpeciesList] = useState([]);
  useEffect(() => {
    fetch(`https://perenual.com/api/species-list?page=${pageNumber}&key=${REACT_APP_PLANT_API_KEY}${param}`)
      .then((response) => response.json())
      .then((data) => {
        setPlantSpeciesList((data.data));
        setLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return (<Loading />);
  return (
    <div className="inspo-plant-list">
      {plantSpeciesList.map((singleSpecies) => {
        return (
          <div key={singleSpecies.id}>
            <button
              className="plant-list-button"
              onClick={() => { navigate(`/plantdatabase/${singleSpecies.id}`) }}
              type="button">
              {singleSpecies.common_name}
            </button>
          </div>
        )
      })}
    </div>
  )
}
