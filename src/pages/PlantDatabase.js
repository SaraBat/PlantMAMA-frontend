import { PlantList } from 'components/PlantList';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styling/plantdatabase.css';

export const PlantDatabase = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  });
  const [param, setParam] = useState(null);
  const onSetParamClick = (value) => {
    setParam(value)
  }

  if (!param) {
    return (
      <div className="div-plant-inspo-button">
        <button
          className="plant-inspo-button"
          type="button"
          value="&poisonous=1"
          onClick={(event) => onSetParamClick(event.target.value)}> Poisonous
        </button>
        <button
          className="plant-inspo-button"
          type="button"
          value="&edible=1"
          onClick={(event) => onSetParamClick(event.target.value)}> Edible
        </button>
        <button
          className="plant-inspo-button"
          type="button"
          value="&indoor=1"
          onClick={(event) => onSetParamClick(event.target.value)}> Indoor
        </button>
        <button
          className="plant-inspo-button"
          type="button"
          value="&medicinal=1"
          onClick={(event) => onSetParamClick(event.target.value)}> Medicinal
        </button>
      </div>
    )
  } else {
    return (
      <div> <PlantList param={param} /> </div>
    )
  }
}