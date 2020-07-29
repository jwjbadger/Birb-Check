import React from 'react';
import Posts from '../Components/Posts/Posts';
import { useHistory } from 'react-router-dom';

function PostsRoute() {
  const history = useHistory();
  if (!window.localStorage.getItem('jwt')) {
    history.push('/login');
    return <div></div>;
  }

  return (
    <div>
      <Posts />
    </div>
  );
}

export default PostsRoute;
