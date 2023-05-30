import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PlantDatabase = () => {
  const [plantSpeciesList, setPlantSpeciesList] = useState([]);
  useEffect(() => {
    for (let i = 1; i < 4; i += 1) {
      fetch(`https://perenual.com/api/species-list?page=${i}&key=sk-uzEu646b489704d0e1015&indoor=1`)
        .then((response) => response.json())
        .then((data) => setPlantSpeciesList(plantSpeciesList.concat(data.data)))
    }
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