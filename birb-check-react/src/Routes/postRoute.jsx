import React from 'react';
import Post from '../Components/Post/Post';
import { useLocation, useHistory } from 'react-router-dom';
import Nav from '../Components/Nav/Nav';

function PostsRoute() {
  const history = useHistory();
  const location = useLocation().pathname;

  if (!window.localStorage.getItem('jwt')) {
    history.push('/login');
    return <div></div>;
  }

  return (
    <div>
      <Nav />
      <Post _id={location.substring(6)} />
    </div>
  );
}

export default PostsRoute;
