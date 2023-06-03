// eslint-disable-no-useless-concat

import { Loading } from 'components/Loading';
import React, { useState, useEffect } from 'react'
import { REACT_APP_WEATHER_API_KEY } from 'utils/BackendUrl';

export const Weather = () => {
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');
  const [main, setMain] = useState('');
  const [description, setDescription] = useState('');
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [sunset, setSunset] = useState(null);
  const [sunrise, setSunrise] = useState(null);

  const error = () => {
    alert('Geolocation not avalible.');
  };

  // eslint-disable-next-line no-unused-vars
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      })
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${REACT_APP_WEATHER_API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setCity(data.name);
            setMain(data.weather[0].main);
            setDescription(data.weather[0].description);
            setTemp(data.main.temp);
            setHumidity(data.main.humidity);

            const sunriseTimeStamp = (data.sys.sunrise * 1000);
            const sunriseFormat = new Date(sunriseTimeStamp);
            const sunriseHours = sunriseFormat.getHours().toString().padStart(2, '0');
            const sunriseMinutes = sunriseFormat.getMinutes().toString().padStart(2, '0');
            const sunriseFinal = `${sunriseHours}:${sunriseMinutes}`;
            setSunrise(sunriseFinal);

            const sunsetTimeStamp = (data.sys.sunset * 1000);
            const sunsetFormat = new Date(sunsetTimeStamp);
            const sunsetHours = sunsetFormat.getHours().toString().padStart(2, '0');
            const sunsetMinutes = sunsetFormat.getMinutes().toString().padStart(2, '0');
            const sunsetFinal = `${sunsetHours}:${sunsetMinutes}`;
            setSunset(sunsetFinal);
            setLoading(false);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [latitude, longitude]);

  if (!navigator.geolocation) { return (error) }
  if (loading) { return (<Loading />) }
  return (
    <p>{city} | {main} | {description} | {temp}° | {humidity}% | {sunrise} | {sunset} </p>

  )
}