import { createSlice } from '@reduxjs/toolkit';

const plants = createSlice({
  name: 'plants',
  initialState: {
    items: [],
    error: null
  },
  reducers: {
    setItems: (store, action) => {
      store.items = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    }
  }
});

export default plants
