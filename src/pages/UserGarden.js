/* eslint-disable-no-useless-concat */
/* eslint-disable no-underscore-dangle */
import { Weather } from 'components/Weather';
import { Loading } from 'components/Loading';
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import plants from 'reducers/plants';
import { API_URL } from 'utils/BackendUrl';
import user from 'reducers/user';
import { AddPlant } from 'components/AddPlant';

// why does this component call the API inside of AddPlant?

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
  });

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: accessToken
          }
        };
        const response = fetch(API_URL(`${username}/garden`), options);
        const data = await (await response).json();
        // fetch(API_URL(`${username}/garden`), options)
        //   .then((response) => response.json())
        //   .then((data) => {
        if (data.success) {
          dispatch(plants.actions.setError(null));
          dispatch(plants.actions.setItems(data.response));
          // setLoading(false);
        } else {
          dispatch(plants.actions.setError(data.response));
          dispatch(plants.actions.setItems([]))
        }
      } catch (error) {
        dispatch(plants.actions.setError(error.message));
        dispatch(plants.actions.setItems([]));
      } finally {
        setLoading(false);
      }
    };
    fetchPlants();
  }, [accessToken, dispatch, username])

  const onLogoutClick = () => {
    dispatch(user.actions.setAccessToken(null));
    dispatch(user.actions.setUsername(null));
    dispatch(user.actions.setUserId(null));
    dispatch(user.actions.setError(null));
    dispatch(plants.actions.setItems([]));
    navigate('/')
  };

  // function that takes a new plant as a param and updates the state of the plants
  // array using spread operator. it creates a new array with the existing plants
  // and the new plant added to it.
  const handleAddPlant = (newPlant) => {
    dispatch(plants.actions.setItems([...plantItems, newPlant]));
  };

  if (loading) {
    return (<Loading />)
  }

  return (
    <div>
      <h5> Weather</h5>
      <Weather />
      <h2> Add Plant </h2>
      {/* passing the handleAddPlant-function into the addplant-component */}
      <AddPlant handleAddPlant={handleAddPlant} />
      <h2> Garden of {username.toUpperCase()}</h2>
      <div className="garden">
        {plantItems ? (
          plantItems.map((item) => {
            return (
              <div key={item._id}>
                <p> Name: {item.plantname} | <Link to={item._id}> Profile </Link></p>
              </div>
            )
          })
        ) : ''}
      </div>
      <button
        type="button"
        onClick={onLogoutClick}> Log Out
      </button>
    </div>
  )
};