import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const SinglePlantSpecies = ({ id }) => {
  const navigate = useNavigate();
  const onGoBackButtonClick = () => {
    navigate(-1);
  };
  const [plantSpecies, setPlantSpecies] = useState('');
  useEffect(() => {
    fetch(`https://perenual.com/api/species/details/${id}?key=sk-xKFD6475fa659b7581106`)
      .then((response) => response.json())
      .then((data) => setPlantSpecies(data))
  }, [id]);
  // h1>{plantSpecies.scientific_name} </h1>
  // <p> Origin: {Origin}</p>
  // {plantSpecies.scientific_name.map((item) => {return (<h1> {item}</h1>)})}
  // propagation
  // sunlight
  // soil
  return (
    <div>
      <section>
        <div key={plantSpecies.id}>
          <h1>{plantSpecies.common_name} </h1>
          <p> Maintenance:{plantSpecies.maintenance} </p>
          <p> Care Level:{plantSpecies.care_level} </p>
          <p> Description:{plantSpecies.description} </p>
          <p> Family:{plantSpecies.family} </p>
          <p> Type:{plantSpecies.type} </p>
          <p>Cycle: {plantSpecies.cycle}</p>
          <p>Watering: {plantSpecies.watering}</p>
          <p>Growth: {plantSpecies.growth_rate}</p>
          <p>Flowering season: {plantSpecies.flowering_season}</p>
          <div className="TrueOrFalseData">
            <p> Drought tolerant: {plantSpecies.drought_tolerant}</p>
            <p> Salt tolerant: {plantSpecies.salt_tolerant}</p>
            <p> Thorny: {plantSpecies.thorny}</p>
            <p> Invasive: {plantSpecies.invasive}</p>
            <p> Tropical: {plantSpecies.tropical}</p>
            <p> Indoor: {plantSpecies.indoor}</p>
            <p>Flowers: {plantSpecies.flowers}</p>
            <p>Fruits: {plantSpecies.fruits}</p>
            <p>Edible fruits: {plantSpecies.edible_fruit}</p>
            <p>Leaf: {plantSpecies.leaf}</p>
            <p>Edible Leaf: {plantSpecies.edible_leaf}</p>
            <p>Medicinal: {plantSpecies.medicinal}</p>
          </div>
        </div>
        <button type="button" onClick={onGoBackButtonClick}> Back </button>
      </section>
    </div>
  )
}