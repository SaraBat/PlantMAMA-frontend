import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { API_URL } from 'utils/BackendUrl';
import { Loading } from 'components/Loading';
import { formatDistance } from 'date-fns';

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

  const onGoToPlantSpeciesButtonClick = () => {
    navigate('/plantdatabase/:plantspecies');
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

  if (loading) return (<Loading />);
  return (
    <div>
      <p> Name: {plantname} </p>
      <p> PlantMama {username} </p>
      <p> Species: {species} </p>
      <button type="button" onClick={onGoToPlantSpeciesButtonClick}> link to plant species page </button>
      <p> Last Drink:
        {formatDistance(new Date(lastWatered), Date.now(), { addSuffix: true })}
      </p>
      <p> Birthday: {birthday} </p>
      <p> Lst Soil change: {lastSoilChange} </p>
      <Link to="">Go to Plant Species </Link>
    </div>
  )
}

