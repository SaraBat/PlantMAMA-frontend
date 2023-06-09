import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Task } from 'reducers/Task';
import { API_URL } from 'utils/BackendUrl';

export const TaskList = () => {
  const taskList = useSelector((store) => store.task.items);
  console.log(taskList);
  const accessToken = useSelector((store) => store.user.accessToken);
  console.log(accessToken);
  const username = useSelector((store) => store.user.username);
  console.log(username);
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

  useEffect(() => {
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
  // eslint-disable-next-line
  }, [taskList]);

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
              <li className="singleTask" key={singleTask.id}>
                <p>
                  <div className="round">
                    <label htmlFor={`Task_with_id${singleTask.id}`}>
                      <input
                        id={`Task_with_id${singleTask.id}`}
                        type="checkbox"
                        value={singleTask.isChecked}
                        onChange={() => onIsCompletedCheckBoxToggle(singleTask.id)} />
                    </label>
                  </div>
                  <span>
                    {singleTask.content}
                  </span>
                  <button
                    className="deleteSingleTaskButton"
                    type="button"
                    onClick={() => OnDeleteSingleTaskButtonClick(singleTask.id)}>
                  🗑️
                  </button>
                </p>
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