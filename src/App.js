import React from 'react'
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from 'components/Main';
import NotFound from 'components/NotFound';
import Login from 'components/Login';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from 'reducers/user';
import thoughts from 'reducers/thoughts';
import { Provider } from 'react-redux';

export const App = () => {
  return (
    <div>
      Find me in src/app.js!
    </div>
  )
}
