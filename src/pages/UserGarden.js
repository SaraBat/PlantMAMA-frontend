// eslint-disable-no-useless-concat
import { Weather } from 'components/Weather';
import { Loading } from 'components/Loading';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import plants from 'reducers/plants';
import { API_URL } from 'utils/BackendUrl';
import user from 'reducers/user';
import { AddPlant } from 'components/AddPlant';
import { PlantProfile } from './PlantProfile';

export const UserGarden = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const plantItems = useSelector((store) => store.plants.items);
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  // eslint-disable-next-line
  });

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL(`${username}/garden`), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log(data);
          dispatch(plants.actions.setError(null));
          dispatch(plants.actions.setItems(data.response));
          setLoading(false);
        } else {
          dispatch(plants.actions.setError(data.response));
          dispatch(plants.actions.setItems([]))
        }
      });
  // eslint-disable-next-line
  }, []);
  const onLogoutClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(plants.actions.setItems([]));
    navigate('/')
  }
  if (loading) { return (<Loading />) }
  return (
    <div>
      <button
        type="button"
        onClick={onLogoutClick}> Log Out
      </button>
      <h1> Weather</h1>
      <Weather />
      <h1> Add Plant </h1>
      <AddPlant />
      <h1> Garden of {username.toUpperCase()}</h1>
      {plantItems ? (
        plantItems.map((item) => {
          return (
            // eslint-disable-next-line no-underscore-dangle
            <div key={item._id}>
              <PlantProfile />
            </div>
          )
        })
      ) : ''}
    </div>
  )
}