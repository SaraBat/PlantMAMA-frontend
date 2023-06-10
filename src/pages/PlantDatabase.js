import { PlantList } from 'components/PlantList';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const PlantDatabase = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  });
  const onBackClick = () => {
    navigate(-1);
  }
  const [param, setParam] = useState(null);
  const onSetParamClick = (value) => {
    setParam(value)
  }

  if (!param) {
    return (
      <div>
        <button
          type="button"
          value="&poisonous=1"
          onClick={(event) => onSetParamClick(event.target.value)}> Poisonous
        </button>
        <button
          type="button"
          value="&edible=1"
          onClick={(event) => onSetParamClick(event.target.value)}> Edible
        </button>
        <button
          type="button"
          value="&indoor=1"
          onClick={(event) => onSetParamClick(event.target.value)}> Indoor
        </button>
        <button
          type="button"
          value="&watering=minimum"
          onClick={(event) => onSetParamClick(event.target.value)}> Minimum watering
        </button>
        <button
          type="button"
          value="&sunlight=full_shade"
          onClick={(event) => onSetParamClick(event.target.value)}> Dark Mode
        </button>
        <button
          type="button"
          onClick={onBackClick}> Back
        </button>
      </div>
    )
  } else {
    return (
      <div> <PlantList param={param} /> </div>
    )
  }
}

// we could filter API data by

/*
  Poisonous - optional, boolean, default is NULL
  If plant species is poisonous or not
  https://perenual.com/api/species-list?key=[YOUR-API-KEY]&poisonous=1
  */
/*
  Edible - optional, boolean, default is NULL
  If plant species is edible or not for consumption
  https://perenual.com/api/species-list?key=[YOUR-API-KEY]&edible=1
  */
/*
  Indoor - optional, boolean, default is NULL
  If plant species is indoors
  https://perenual.com/api/species-list?key=[YOUR-API-KEY]&indoor=1
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