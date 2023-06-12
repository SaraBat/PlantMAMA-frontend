import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from 'utils/BackendUrl';
import { Loading } from 'components/Loading';
import { formatDistance, format } from 'date-fns';
import '../styling/PlantProfile.css'
// import plants from 'reducers/plants';

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
  const [imageUrl, setImageUrl] = useState(null);
  // const dispatch = useDispatch();

  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  });

  const onGoToPlantSpeciesButtonClick = () => {
    navigate(`/${username}/garden/${plantId}/species/${species}`);
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
        setImageUrl(data.response.imageUrl);
        setLoading(false)
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return (<Loading />);
  return (
    <div className="plant-profile-div">
      <img className="garden-plant-picture" src={imageUrl} alt="profile" />
      <p> Name: {plantname} </p>
      <p> Birthday: {format(new Date(birthday), 'dd/MM/yyyy')} </p>
      <p> PlantMama: {username} </p>
      <p> Species: {species} </p>
      <button type="button" onClick={onGoToPlantSpeciesButtonClick}> See plant species page </button>
      <p> Last Drink: {formatDistance(new Date(lastWatered), Date.now(), { addSuffix: true })}
      </p>
      <p>
      Last Soil change: {format(new Date(lastSoilChange), 'dd/MM/yyyy')}
      </p>
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

