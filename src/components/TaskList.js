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
      <u className="todo-ul">
        {taskList.map((singleTask) => {
          return (
            <section key={singleTask.id} className="TaskListSection">
              <div className="singleTask">
                <div className="taskText">
                  <label htmlFor={`Task_with_id${singleTask.id}`}>
                    <input
                      id={`Task_with_id${singleTask.id}`}
                      type="checkbox"
                      value={singleTask.isChecked}
                      onChange={() => onIsCompletedCheckBoxToggle(singleTask.id)} />
                  </label>
                  <p>
                    {singleTask.content}
                  </p>
                </div>
                <div className="delete-task">
                  <button
                    className="deleteSingleTaskButton"
                    type="button"
                    onClick={() => OnDeleteSingleTaskButtonClick(singleTask.id)}>
                  🗑️
                  </button>
                </div>
              </div>
            </section>
          )
        })}
      </u>
      <button
        className="ClearListButton"
        type="button"
        onClick={onDeleteAllTasksButtonClick}>
                  Clear List
      </button>
    </section>
  );
}