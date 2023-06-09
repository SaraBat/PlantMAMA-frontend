import { createSlice } from '@reduxjs/toolkit';

export const Task = createSlice({
  name: 'task',
  initialState: {
    items: [
      {
        id: '19asdfiuhas0823hjkadsh809',
        content: 'New to-do',
        isChecked: false
      },
      {
        id: '19asdfiuhas0823hjkadsh809',
        content: 'Water my Plants',
        isChecked: false
      },
      {
        id: '19asdfiuhas0823hjkadsh809',
        content: 'Trim monstera',
        isChecked: false
      }
    ]
  },
  reducers: {
    addNewTask: (store, action) => {
      store.items = [action.payload, ...store.items];
    },
    setItems: (store, action) => {
      store.items = action.payload
    },
    deleteAllTasks: (store) => {
      store.items = [];
    },
    deleteSingleTask: (store, action) => {
      const id = action.payload;
      const copyOfTaskArrayFromStoreState = store.items;
      const condition = (element) => element.id === id;
      const foundIndex = (copyOfTaskArrayFromStoreState.findIndex(condition));
      copyOfTaskArrayFromStoreState.splice(foundIndex, 1);
      store.items = copyOfTaskArrayFromStoreState;
    },

    toggleIdTaskIsCompleted: (store, action) => {
      const id = action.payload;
      const copyOfTaskArrayFromStoreState = store.items;
      const condition = (element) => element.id === id;
      const foundIndex = (copyOfTaskArrayFromStoreState.findIndex(condition));
      // eslint-disable-next-line max-len
      copyOfTaskArrayFromStoreState[foundIndex].isChecked = !copyOfTaskArrayFromStoreState[foundIndex].isChecked;
      store.items = copyOfTaskArrayFromStoreState;
    },

    setError: (store, action) => {
      store.error = action.payload
    }
  }
})
