import { createSlice } from '@reduxjs/toolkit';
// import { ui } from './ui';

export const Task = createSlice({
  name: 'task',
  initialState: {
    items: [
      {
        id: null,
        content: '',
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

export const fetchTasks = () => {
  return (dispatch, getState) => {
    dispatch(ui.actions.setLoading(true));
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      }
    }
    fetch(API_URL(`${username}/todo`), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(Task.actions.setError(null));
          dispatch(Task.actions.setItems(data.response));
        } else {
          dispatch(Task.actions.setError(data.response));
          dispatch(Task.actions.setItems([]))
        }
      });
  }
}
