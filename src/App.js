import React from 'react'
import { Login } from 'pages/Login';
import { LandingPage } from 'pages/LandingPage';
import { Register } from 'pages/Register';
import { UserProfile } from 'pages/UserProfile';
import { EditUserProfile } from 'pages/EditUserProfile';
import { UserGarden } from 'pages/UserGarden';
import { PlantProfile } from 'pages/PlantProfile';
import { EditPlantProfile } from 'pages/EditPlantProfile';
import { PlantUsernameSpecies } from 'pages/PlantUsernameSpecies';
import { PlantDatabase } from 'pages/PlantDatabase';
import { PlantSpecies } from 'pages/PlantSpecies';
import { NotFound } from 'pages/NotFound';
import { Contact } from 'pages/Contact';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import plants from 'reducers/plants';
import { Provider } from 'react-redux';
import { Nav } from 'components/Nav';
import Logo from 'assets/PlantMama_logo.svg'

export const App = () => {
  const reducer = combineReducers({
    user: user.reducer,
    plants: plants.reducer
  });
  const store = configureStore({ reducer })

  return (
    <main>
      <img className="logo" src={Logo} alt="PlantMama logo" />
      <div className="main">
        <Provider store={store}>
          <BrowserRouter>
            <Nav />
            <div className="content">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/:username" element={<UserProfile />} />
                <Route path="/:username/editUser" element={<EditUserProfile />} />
                <Route path="/:username/garden" element={<UserGarden />} />
                <Route path="/:username/garden/:plantId" element={<PlantProfile />} />
                <Route path="/:username/garden/:plantId/editPlant" element={<EditPlantProfile />} />
                <Route path="/:username/garden/:plantId/species/:plantusernamespecies" element={<PlantUsernameSpecies />} />
                <Route path="/plantdatabase" element={<PlantDatabase />} />
                <Route path="/plantdatabase/:id" element={<PlantSpecies />} />
                <Route path="*" element={<NotFound />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </div>
          </BrowserRouter>
        </Provider>
      </div>
    </main>
  )
}
