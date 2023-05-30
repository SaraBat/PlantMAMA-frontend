import React from 'react'
import { Login } from 'pages/Login';
import { LandingPage } from 'pages/LandingPage';
import { Register } from 'pages/Register';
import { UserProfile } from 'pages/UserProfile';
import { UserGarden } from 'pages/UserGarden';
import { PlantProfile } from 'pages/PlantProfile';
import { PlantUsernameSpecies } from 'pages/PlantUsernameSpecies';
import { PlantDatabase } from 'pages/PlantDatabase';
import { PlantSpecies } from 'pages/PlantSpecies';
import { NotFound } from 'pages/NotFound';
import { Contact } from 'pages/Contact';
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
        <Route path="/:username/garden/:plantusername/:plantusernamespecies" element={<PlantUsernameSpecies />} />
        <Route path="/plantdatabase" element={<PlantDatabase />} />
        <Route path="/plantdatabase/:id" element={<PlantSpecies />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}
