import React from 'react';
import Login from '../Components/Login/Login';
import { useHistory } from 'react-router-dom';

function LoginRoute() {
  return (
    <div>
      <Login history={useHistory()} />
    </div>
  );
}

export default LoginRoute;
