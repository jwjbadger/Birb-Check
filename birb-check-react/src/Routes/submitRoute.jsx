import React from 'react';
import Submit from '../Components/Submit/Submit';
import { useHistory } from 'react-router-dom';

function SubmitRoute() {
  return (
    <div>
      <Submit history={useHistory()} />
    </div>
  );
}

export default SubmitRoute;
