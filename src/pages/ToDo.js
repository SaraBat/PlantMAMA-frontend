import React, { useEffect } from 'react';
import { NewTask } from 'components/NewTask';
import { TaskList } from 'components/TaskList';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styling/todo.css';

export const ToDo = () => {
  const navigate = useNavigate();
  const accessToken = useSelector((store) => store.user.accessToken);
  useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  });

  return (
    <section className="todo-main-container">
      <NewTask />
      <TaskList />
    </section>
  );
}
