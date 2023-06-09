import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Task } from 'reducers/Task';

export const NewTask = () => {
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();
  const onAddNewTaskSubmit = (event) => {
    event.preventDefault();

    const TaskAdded = {
      id: Date.now.toString(),
      content: inputValue,
      isChecked: false
    };
    dispatch(Task.actions.addNewTask(TaskAdded));
    // when action is dipatched, we clear form so user can do it again
    setInputValue('');
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