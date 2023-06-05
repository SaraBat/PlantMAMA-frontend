import { createSlice } from '@reduxjs/toolkit';

const plants = createSlice({
  name: 'plants',
  initialState: {
    items: [{
      plantId: null,
      plantname: '',
      species: ''
    }],
    error: null
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload;
    },
    setError: (store, action) => {
      store.error = action.payload;
    },
    setPlantId: (store, action) => {
      store.items.plantID = action.payload;
    },
    setPlantname: (store, action) => {
      store.items.plantname = action.payload;
    },
    setSpecies: (store, action) => {
      store.items.species = action.payload;
    },
    setBirthday: (store, action) => {
      store.items.species = action.payload;
    },
    setLastWatered: (store, action) => {
      store.items.species = action.payload;
    },
    setLastSoilChange: (store, action) => {
      store.items.species = action.payload;
    }
  }
});

export default plants;
