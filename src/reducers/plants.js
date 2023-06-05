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
      store.items = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
    setPlantId: (store, action) => {
      store.items.plantID = action.payload
    },
    setPlantname: (store, action) => {
      store.items.plantname = action.payload
    },
    setSpecies: (store, action) => {
      store.items.species = action.payload
    },
    setBirthday: (store, action) => {
      store.items.species = action.payload
    },
    setLastWatered: (store, action) => {
      store.items.species = action.payload
    },
    setLastSoilChange: (store, action) => {
      store.items.species = action.payload
    },
    deleteSinglePlant: (store, action) => {
      const id = action.payload;
      // splice method to remove single element from array based on index
      // copy array to work in immutable way
      const copyOfPlantArrayFromStoreState = store.items;
      // the id of element we're looking for needs to match action payload id
      const condition = (element) => element.id === id;
      // apply findIndex method to array copy with condition above
      const foundIndex = (copyOfPlantArrayFromStoreState.findIndex(condition));
      // remove 1 element from array whose id is 'foundIndex'
      copyOfPlantArrayFromStoreState.splice(foundIndex, 1);
      // assign new value to original array without mutating it
      store.items = copyOfPlantArrayFromStoreState;
    }
  }
});

export default plants
