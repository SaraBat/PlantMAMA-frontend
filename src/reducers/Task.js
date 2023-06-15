import { createSlice } from '@reduxjs/toolkit';

export const Task = createSlice({
  name: 'task',
  initialState: {
    items: [
      {
        id: '19asdfiuhas0823hjkadsh809',
        content: 'Check Lilys birthday',
        isChecked: false
      },
      {
        id: '19asdfiuhas0823hjkadsh810',
        content: 'Dont poison the ivy',
        isChecked: false
      },
      {
        id: '19asdfiuhas0823hjkadsh811',
        content: 'Trim Big the monstera',
        isChecked: false
      }
    ]
  },
  reducers: {
    addNewTask: (store, action) => {
      store.items = [action.payload, ...store.items];
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
    }
  }
})
