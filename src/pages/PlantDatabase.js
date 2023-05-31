import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const PlantDatabase = () => {
  // we could filter API data by
  /*
  Cycle - optional, string
   The plant cycle of the species.
   Options - perennial, annual, biennial, biannual
   https://perenual.com/api/species-list?key=[YOUR-API-KEY]&cycle=annual
  */
  /*
  Watering - optional, string
   The watering amount of the species.
   Options - frequent, average, minimum, none
   https://perenual.com/api/species-list?key=[YOUR-API-KEY]&watering=frequent
 */
  /*
  Sunlight - optional, string
   The sunlight amount of the species.
   Options - full_shade, part_shade, sun-part_shade, full_sun
   https://perenual.com/api/species-list?key=[YOUR-API-KEY]&sunlight=full_sun
 */

  const [plantSpeciesList, setPlantSpeciesList] = useState([]);
  useEffect(() => {
    fetch('https://perenual.com/api/species-list?page=1&key=[key]&indoor=1')
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