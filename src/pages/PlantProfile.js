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
      <img className="plant-profile-picture" src={imageUrl} alt="profile" />
      <div className="plant-info-div">
        <p className="plantprofile-p"> <b>Name:&nbsp;</b> {plantname} </p>
        <p className="plantprofile-p"> <b>Species:&nbsp;</b> {species} </p>
        <p className="plantprofile-p"> <b>Birthday:&nbsp;</b> {format(new Date(birthday), 'dd/MM/yyyy')} </p>
        <p className="plantprofile-p"> <b>PlantMama:&nbsp;</b>{username} </p>
        <p className="plantprofile-p"> <b>Last Drink:&nbsp;</b> {formatDistance(new Date(lastWatered), Date.now(), { addSuffix: true })}
        </p>
        <p className="plantprofile-p">
          <b>Last soil change:&nbsp;</b>{format(new Date(lastSoilChange), 'dd/MM/yyyy')}
        </p>
      </div>
      <button type="button" onClick={onGoToPlantSpeciesButtonClick}> See plant species page </button>
      <button
        className="on-edit-plant-button"
        type="button"
        onClick={onEditPlantClick}> Edit Plant
      </button>
    </div>
  )
}

