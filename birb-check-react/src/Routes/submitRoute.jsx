import React from 'react';
import Submit from '../Components/Submit/Submit';
import { useHistory } from 'react-router-dom';

function SubmitRoute() {
  const history = useHistory();
  if (!window.localStorage.getItem('jwt')) history.push('/login');

  return (
    <div>
      <Submit history={useHistory()} />
    </div>
  );
}

export default SubmitRoute;
