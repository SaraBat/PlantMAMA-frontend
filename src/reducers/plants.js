import { createSlice } from '@reduxjs/toolkit';

const plants = createSlice({
  name: 'plants',
  initialState: {
    items: [{
      plantname: '',
      species: ''
    }],
    error: null
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
    setPlantname: (store, action) => {
      store.items.plantname = action.payload
    },
    setSpecies: (store, action) => {
      store.items.species = action.payload
    }
  }
});

export default plants
