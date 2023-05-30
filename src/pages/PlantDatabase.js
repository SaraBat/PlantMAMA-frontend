import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PlantDatabase = () => {
  const [plantSpeciesList, setPlantSpeciesList] = useState([]);
  useEffect(() => {
    fetch('https://perenual.com/api/species-list?page=1&key=key&indoor=1')
      .then((response) => response.json())
      .then((data) => setPlantSpeciesList((data.data)))
  }, []);
  console.log(plantSpeciesList);
  return (
    <div>
      {plantSpeciesList.map((singleSpecies) => {
        return (
          <div key={singleSpecies.id}>
            <Link to={`/plantdatabase/${singleSpecies.id}`}> Learn more about {singleSpecies.common_name}  </Link>
          </div>
        )
      })}
    </div>
  )
}

/*
  return (
    <div>
      {plantSpeciesList.map((singleSpecies) => {
        return (
          <div key={singleSpecies.id}>
            <h1>{singleSpecies.common_name} </h1>
            <p>Cycle: {singleSpecies.cycle}</p>
            <p>Watering: {singleSpecies.watering}</p>
          </div>
        )
      })}
    </div>
  )
*/

/*
            {singleSpecies.map((item) => {
              return (
                <div key={item.id}>
                  <p> {item.sunlight} </p>
                </div>
              )
            })}
*/