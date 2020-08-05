import React from 'react';
import Submit from '../Components/Submit/Submit';
import { useHistory } from 'react-router-dom';
import Nav from '../Components/Nav/Nav';

function SubmitRoute() {
  const history = useHistory();
  if (!window.localStorage.getItem('jwt')) {
    history.push('/login');
    return <div></div>;
  }

  return (
    <div>
      <Nav />
      <Submit history={history} />
    </div>
  );
}

export default SubmitRoute;
