/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { REACT_APP_PLANT_API_KEY } from 'utils/BackendUrl';
import { Loading } from './Loading';
import '../styling/SinglePlantSpecies.css';

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

  let sunlight = [];
  if (plantSpecies.sunlight) {
    sunlight = plantSpecies.sunlight.map((item) => item);
  } else { sunlight = [] }

  if (loading) { return (<Loading />) }

  return (
    <section className="plantspecies-wrapper">
      <div className="plantimgandinfo-div">
        <div className="imgandname-div">
          <div className="img-div">
            <img alt="profile" className="plantspecies-pic" src={pictureUrl} />
          </div>
          <div className="plantspecies-div" key={plantSpecies.id}>
            <div className="plantspecies-name-div">
              {plantSpecies.common_name ? <h1 className="plantspecies-h1"> {plantSpecies.common_name} </h1> : ''}
              {ScientificName ? <p className="plantspecies-p"> <b>Scientific name:</b> {ScientificName}</p> : ''}
            </div>
          </div>
        </div>
        <div className="species-basicinfo-div">
          {plantSpecies.care_level ? <p className="species-basicinfo-p"> <b>Care Level:</b> {plantSpecies.care_level} </p> : ''}
          {plantSpecies.maintenance ? <p className="species-basicinfo-p"> <b>Maintenance:</b> {plantSpecies.maintenance} </p> : ''}
          {origin ? <p className="species-basicinfo-p"> <b>Origin:</b> {origin}</p> : ''}
          {plantSpecies.type ? <p className="species-basicinfo-p"> <b>Type:</b> {plantSpecies.type} </p> : ''}
          {plantSpecies.watering ? <p className="species-basicinfo-p"> <b>Watering:</b> {plantSpecies.watering} </p> : ''}
          {sunlight ? <p className="species-basicinfo-p"> <b>Sunlight:</b> {sunlight} </p> : ''}
          {plantSpecies.growth_rate ? <p className="species-basicinfo-p"> <b>Growth:</b> {plantSpecies.growth_rate} </p> : ''}
          {plantSpecies.flowering_season ? <p className="species-basicinfo-p"> <b>Flowering season:</b> {plantSpecies.flowering_season} </p> : ''}
        </div>
      </div>
      <div className="plant-description">
        {plantSpecies.description ? <p className="plantspecies-p"> {plantSpecies.description} </p> : ''}
      </div>
    </section>
  )
}