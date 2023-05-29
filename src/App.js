import React from 'react'
import { Login } from 'components/Login';
import { LandingPage } from 'components/LandingPage';
import { Register } from 'components/Register';
import { UserProfile } from 'components/UserProfile';
import { UserGarden } from 'components/UserGarden';
import { PlantProfile } from 'components/PlantProfile';
import { PlantSpecies } from 'components/PlantSpecies';
import { NotFound } from 'components/NotFound';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

export const App = () => {
  return (
    <div>
      <LandingPage />
      <Register />
      <Login />
      <UserProfile />
      <UserGarden />
      <PlantProfile />
      <PlantSpecies />
      <NotFound />
    </div>
  )
}
