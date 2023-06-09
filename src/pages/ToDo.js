import React from 'react';
import { NewTask } from 'components/NewTask';
import { TaskList } from 'components/TaskList';
import { useNavigate } from 'react-router-dom';

export const ToDo = () => {
  const navigate = useNavigate();
  /*
  const accessToken = useSelector((store) => store.user.accessToken);
  const username = useSelector((store) => store.user.username);

    useEffect(() => {
    if (!accessToken) {
      navigate('/login')
    }
  });
  */
  const onBackClick = () => {
    navigate(-1);
  };

  return (
    <section>
      <NewTask />
      <TaskList />
      <button
        type="button"
        onClick={onBackClick}> Back
      </button>
    </section>
  );
}
