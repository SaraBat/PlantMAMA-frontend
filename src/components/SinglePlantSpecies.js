/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { REACT_APP_PLANT_API_KEY } from 'utils/BackendUrl';
import { Loading } from './Loading';

export const SinglePlantSpecies = ({ id }) => {
  const [loading, setLoading] = useState(true);
  const [plantSpecies, setPlantSpecies] = useState('');
  useEffect(() => {
    fetch(`https://perenual.com/api/species/details/${id}?key=${REACT_APP_PLANT_API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          setPlantSpecies(data); setLoading(false)
        }
      })
      .catch((e) => console.log(e));
  }, [id]);

  const pictureUrl = plantSpecies ? plantSpecies.default_image.small_url : '';
  const ScientificName = plantSpecies ? plantSpecies.scientific_name[0] : '';
  const origin = plantSpecies ? plantSpecies.origin[0] : '';
  console.log(pictureUrl);

  let sunlight = [];
  if (plantSpecies.sunlight) {
    sunlight = plantSpecies.sunlight.map((item) => item);
  } else { sunlight = [] }

  /*
  let soil = [];
  if (plantSpecies.soil) {
    soil = plantSpecies.soil.map((item) => item);
  } else { soil = [] }
 */

  if (loading) { return (<Loading />) }

  // picture doesn't work

  return (
    <div>
      <section>
        <div key={plantSpecies.id}>
          <img alt="profile" src={pictureUrl} />
          {plantSpecies.common_name ? <p> {plantSpecies.common_name} </p> : ''}
          {ScientificName ? <p> Scientific name: {ScientificName}</p> : ''}
          {plantSpecies.description ? <p> {plantSpecies.description} </p> : ''}
          {plantSpecies.care_level ? <p> Care Level:{plantSpecies.care_level} </p> : ''}
          {plantSpecies.maintenance ? <p> Maintenance:{plantSpecies.maintenance} </p> : ''}
          {origin ? <p> Origin: {origin}</p> : ''}
          {plantSpecies.family ? <p> Family:{plantSpecies.family} </p> : ''}
          {plantSpecies.type ? <p> Type:{plantSpecies.type} </p> : ''}
          {plantSpecies.cycle ? <p> Cycle: {plantSpecies.cycle} </p> : ''}
          {plantSpecies.watering ? <p> Watering: {plantSpecies.watering} </p> : ''}
          {sunlight ? <p> Sunlight: {sunlight} </p> : ''}
          {plantSpecies.growth_rate ? <p> Growth: {plantSpecies.growth_rate} </p> : ''}
          {plantSpecies.flowering_season ? <p> Flowering season: {plantSpecies.flowering_season} </p> : ''}
          <div className="TrueOrFalseData">
            {plantSpecies.drought_tolerant === true ? <p> Drought tolerant: 🍃 </p> : <p> Drought tolerant: 🍂 </p>}
            {plantSpecies.salt_tolerant === true ? <p> Salt tolerant: 🍃 </p> : <p> Salt tolerant: 🍂 </p>}
            {plantSpecies.thorny === true ? <p> Thorny: 🍃 </p> : <p> Thorny: 🍂 </p>}
            {plantSpecies.invasive === true ? <p> Invasive: 🍃 </p> : <p> Invasive: 🍂 </p>}
            {plantSpecies.tropical === true ? <p> Tropical: 🍃 </p> : <p> Tropical: 🍂 </p>}
            {plantSpecies.indoor === true ? <p> Indoor: 🍃 </p> : <p> Indoor: 🍂 </p>}
            {plantSpecies.flowers === true ? <p> Flowers: 🍃 </p> : <p> Flowers: 🍂 </p>}
            {plantSpecies.cones === true ? <p> Cones: 🍃 </p> : <p> Cones: 🍂 </p>}
            {plantSpecies.fruits === true ? <p> Fruits: 🍃 </p> : <p> Fruits: 🍂 </p>}
            {plantSpecies.edible_fruit === true ? <p> Edible fruits: 🍃 </p> : <p> Edible fruits: 🍂 </p>}
            {plantSpecies.leaf === true ? <p> Leaf: 🍃 </p> : <p> Leaf: 🍂 </p>}
            {plantSpecies.edible_leaf === true ? <p> Edible Leaf: 🍃 </p> : <p> Edible Leaf: 🍂 </p>}
            {plantSpecies.medicinal === true ? <p> Medicinal: 🍃 </p> : <p> Medicinal: 🍂 </p>}
          </div>
        </div>
      </section>
    </div>
  )
}