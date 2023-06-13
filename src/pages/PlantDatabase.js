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
          value="&watering=average"
          onClick={(event) => onSetParamClick(event.target.value)}> Average watering
        </button>
        <button
          type="button"
          value="&watering=frequent"
          onClick={(event) => onSetParamClick(event.target.value)}> Frequent watering
        </button>

        <button
          type="button"
          value="&sunlight=full_shade"
          onClick={(event) => onSetParamClick(event.target.value)}> Dark Mode
        </button>
        <button
          type="button"
          value="&sunlight=part_shade"
          onClick={(event) => onSetParamClick(event.target.value)}> Shady
        </button>
        <button
          type="button"
          value="&sunlight=sun-part_shade"
          onClick={(event) => onSetParamClick(event.target.value)}> Night&Day
        </button>
        <button
          type="button"
          value="&sunlight=full_sun"
          onClick={(event) => onSetParamClick(event.target.value)}> Solar
        </button>
      </div>
    )
  } else {
    return (
      <div> <PlantList param={param} /> </div>
    )
  }
}