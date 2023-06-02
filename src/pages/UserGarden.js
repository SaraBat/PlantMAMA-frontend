// eslint-disable-no-useless-concat
import { Weather } from 'components/Weather';
import { Loading } from 'components/Loading';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import plants from 'reducers/plants';
import { API_URL } from 'utils/BackendUrl';
import user from 'reducers/user';

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
  }, [accessToken]);

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
  }, [accessToken]);
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
      <Weather />
      <h2> these are the plants of {username.toUpperCase()}</h2>
      {plantItems ? (
        plantItems.map((item) => {
          return (
            // eslint-disable-next-line no-underscore-dangle
            <p key={item._id}>
              {item.message}
            </p>
          )
        })
      ) : ''}
      <ul>
        <li> Plant mama/papa name & info </li>
        <li> Garden grid:
        Plant list (with overview of each plant that is link to go to plant profile page)
        </li>
        <li> Plant name (ie: Sally)</li>
        <li> plant profile picture (?)</li>
        <li> last watered (?) + countdown to next watering (?)</li>
      </ul>
      <ul>
        <li> plus button to add plant takes you to pop up</li>
        <li> Insert plant name</li>
        <li> Choose plant species</li>
        <li> Birthday</li>
        <li> upload plant picture</li>
        <li> Last watered</li>
        <li> Last soil change</li>
      </ul>
    </div>
  )
}