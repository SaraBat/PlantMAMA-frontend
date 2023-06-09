/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from 'utils/BackendUrl';
import { Task } from 'reducers/Task';

export const NewTask = () => {
  const [inputValue, setInputValue] = useState('');
  const taskItems = useSelector((store) => store.task.items);
  const [newTask, setNewTask] = useState('');
  const dispatch = useDispatch();
  const accessToken = useSelector((store) => store.user.accessToken);
  const handleNewTask = () => {
    dispatch(Task.actions.setItems([...taskItems, newTask]));
  };
  const onAddNewTaskSubmit = (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken
      },
      body: JSON.stringify({ content: inputValue, isChecked: false })
    };
    fetch(API_URL('addtask'), options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
        // creating a new task-object with data based on the task-schema:
          setNewTask({
            id: data.response._id,
            content: inputValue,
            isChecked: false
          })
          dispatch(Task.actions.setError(null));
          dispatch(Task.actions.addNewTask(newTask));
          // calling the handleAddPlant-function with the newPlant-object
          // as an argument, comprised of all the data the user passed in themselves
          handleNewTask(newTask);
        } else {
        // dispatching error message if task object wasn't successfully created
          dispatch(Task.actions.setError(data.response));
        }
      })
    // emptying the form when the new plant has been added
      .then(() => {
        setInputValue('');
      });
  }

  return (
    <section className="NewTaskSection">
      <h1> Plantastic Day! </h1>
      <h2> To Do </h2>
      <form className="NewTaskForm" onSubmit={onAddNewTaskSubmit}>
        <label htmlFor="NewTaskInput">
          <input
            id="NewTaskInput"
            value={inputValue} /* needs to change based on user input/reset function defined up */
            onChange={(event) => setInputValue(event.target.value)} /* needed to read input */
            type="text" />
        </label>
        <button
          type="submit"
          className="newTaskButton">
          ➕
        </button>
      </form>
    </section>
  );
}