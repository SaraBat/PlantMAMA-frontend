import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
  name: 'user',
  initialState: {
    username: null,
    email: null,
    userId: null,
    imageUrl: null,
    accessToken: null,
    city: null,
    level: null,
    bio: null,
    error: null
  },
  reducers: {
    setUsername: (store, action) => {
      store.username = action.payload
    },
    setEmail: (store, action) => {
      store.email = action.payload
    },
    setImageUrl: (store, action) => {
      store.imageUrl = action.payload
    },
    setUserId: (store, action) => {
      store.userId = action.payload
    },
    setAccessToken: (store, action) => {
      store.accessToken = action.payload
    },
    setCity: (store, action) => {
      store.city = action.payload
    },
    setLevel: (store, action) => {
      store.level = action.payload
    },
    setBio: (store, action) => {
      store.bio = action.payload
    },
    setError: (store, action) => {
      store.error = action.payload
    },
    deleteUser: (store) => {
      store.username = null;
      store.email = null;
      store.userId = null;
      store.imageUrl = null;
      store.accessToken = null;
      store.city = null;
      store.level = null;
      store.bio = null;
      store.error = null
    }
  }
});

export default user