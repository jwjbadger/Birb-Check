import React from 'react';
import Post from '../Components/Post/Post';
import { useLocation, useHistory } from 'react-router-dom';

function PostsRoute() {
  const history = useHistory();

  if (!window.localStorage.getItem('jwt')) history.push('/login');
  const location = useLocation().pathname;

  return (
    <div>
      <Post _id={location.substring(6)} />
    </div>
  );
}

export default PostsRoute;
