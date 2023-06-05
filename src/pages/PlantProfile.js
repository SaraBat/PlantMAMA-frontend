import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { API_URL } from 'utils/BackendUrl';
import { Loading } from 'components/Loading';
import { formatDistance } from 'date-fns';
import plants from 'reducers/plants';

export const PlantProfile = () => {
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  const { plantId } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [plantname, setPlantname] = useState(null);
  const [species, setSpecies] = useState(null);
  const [lastWatered, setLastWatered] = useState(null);
  const [birthday, setBirthday] = useState(null);
  const [lastSoilChange, setLastSoilChange] = useState(null);
  const dispatch = useDispatch();

  const onGoToPlantSpeciesButtonClick = () => {
    navigate('/plantdatabase/:plantspecies');
  };

  const onBackClick = () => {
    navigate(-1);
  };
  const onEditPlantClick = () => {
    navigate(`/${username}/garden/${plantId}/editPlant`);
  };

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL(`${username}/garden/${plantId}`), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlantname(data.response.plantname);
        setSpecies(data.response.species);
        setLastWatered(data.response.lastWatered);
        setBirthday(data.response.birthday);
        setLastSoilChange(data.response.lastSoilChange);
        setLoading(false)
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onDeletePlantClick = () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    // eslint-disable-next-line space-unary-ops
    fetch(API_URL(`${username}/garden/${plantId}`), options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(plants.actions.deleteSinglePlant(plantId));
        navigate(-1)
        dispatch(plants.actions.setError(null));
      });
  };

  if (loading) return (<Loading />);
  return (
    <div>
      <p> Name: {plantname} </p>
      <p> PlantMama {username} </p>
      <p> Species: {species} </p>
      <button type="button" onClick={onGoToPlantSpeciesButtonClick}> WIP link to plant species page </button>
      <p> Last Drink:
        {formatDistance(new Date(lastWatered), Date.now(), { addSuffix: true })}
      </p>
      <p> Birthday: {birthday} </p>
      <p> Lst Soil change: {lastSoilChange} </p>
      <Link to="">WIP Go to Plant Species </Link>
      <button
        type="button"
        onClick={onDeletePlantClick}> Delete Plant
      </button>
      <button
        type="button"
        onClick={onEditPlantClick}> Edit Plant
      </button>
      <button
        type="button"
        onClick={onBackClick}> Back
      </button>
    </div>
  )
}

