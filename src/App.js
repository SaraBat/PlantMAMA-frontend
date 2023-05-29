import React from 'react'
import { Login } from 'components/Login';
import { LandingPage } from 'components/LandingPage';
import { Register } from 'components/Register';
import { UserProfile } from 'components/UserProfile';
import { UserGarden } from 'components/UserGarden';
import { PlantProfile } from 'components/PlantProfile';
import { PlantSpecies } from 'components/PlantSpecies';
import { NotFound } from 'components/NotFound';
import { Contacts } from 'components/Contacts';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/:username" element={<UserProfile />} />
        <Route path="/:username/garden" element={<UserGarden />} />
        <Route path="/:username/garden/:plantusername" element={<PlantProfile />} />
        <Route path="/:plantspecies" element={<PlantSpecies />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  )
}
