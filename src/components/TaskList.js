import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from 'reducers/Task';

export const TaskList = () => {
  const taskList = useSelector((store) => store.task.items);
  const dispatch = useDispatch();
  const OnDeleteSingleTaskButtonClick = (id) => {
    dispatch(Task.actions.deleteSingleTask(id));
  };
  const onIsCompletedCheckBoxToggle = (id) => {
    dispatch(Task.actions.toggleIdTaskIsCompleted(id));
  };
  const onDeleteAllTasksButtonClick = () => {
    dispatch(Task.actions.deleteAllTasks())
  };

  /* map below works because of spread operator in Task.js
  that creates an array and includes new tasks added
  without any nesting - if there were nesting
  we would get an undefined error doing map */
  return (
    <section className="widerTaskListSection">
      <ul>
        {taskList.map((singleTask) => {
          return (
            <section key={singleTask.id} className="TaskListSection">
              <li className="singleTask">
                <div className="round">
                  <label htmlFor={`Task_with_id${singleTask.id}`}>
                    <input
                      id={`Task_with_id${singleTask.id}`}
                      type="checkbox"
                      value={singleTask.isChecked}
                      onChange={() => onIsCompletedCheckBoxToggle(singleTask.id)} />
                  </label>
                </div>
                <p>
                  {singleTask.content}
                </p>
                <button
                  className="deleteSingleTaskButton"
                  type="button"
                  onClick={() => OnDeleteSingleTaskButtonClick(singleTask.id)}>
                  🗑️
                </button>
              </li>
            </section>
          )
        })}
      </ul>
      <button
        className="ClearListButton"
        type="button"
        onClick={onDeleteAllTasksButtonClick}>
                  Clear List
      </button>
    </section>
  );
}