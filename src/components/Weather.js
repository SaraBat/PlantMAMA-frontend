// eslint-disable-no-useless-concat
import React, { useState, useEffect } from 'react'
import swal from 'sweetalert';
import { REACT_APP_WEATHER_API_KEY } from 'utils/BackendUrl';
import { WeatherLoading } from './WeatherLoading';
import '../styling/Weather.css'

export const Weather = () => {
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);

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

  // CITY https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

  useEffect(() => {
    if (latitude && longitude) {
      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=${REACT_APP_WEATHER_API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            setCity(data.name);
            setDescription(data.weather[0].description);
            setTemp(data.main.temp);
            setHumidity(data.main.humidity);
            setLoading(false);
          }
        })
        .catch((e) => console.log(e));
    }
  }, [latitude, longitude]);

  const weatherNoticiation = () => {
    if (temp >= 20) {
      swal({
        title: 'Its warm today! ☀️',
        text: 'Remember to mist your plant babies 🌱',
        button: 'Copy that'
      })
    } else {
      swal({
        title: 'Brr!',
        text: 'Close the windows and protect your plants from the cold breeze!',
        button: 'Copy that'
      })
    }
  }

  if (!navigator.geolocation) { return (error) }
  if (loading) { return (<WeatherLoading />) }
  return (
    <div className="weather-div">
      <p className="weather-p">{city} | {temp}° C | {description} | {humidity} % humidity </p>
      {weatherNoticiation()}
    </div>
  )
}