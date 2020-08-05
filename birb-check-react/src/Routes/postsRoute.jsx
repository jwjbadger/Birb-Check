import React from 'react';
import Posts from '../Components/Posts/Posts';
import { useHistory } from 'react-router-dom';
import Nav from '../Components/Nav/Nav';
function PostsRoute() {
  const history = useHistory();
  if (!window.localStorage.getItem('jwt')) {
    history.push('/login');
    return <div></div>;
  }

  return (
    <div>
      <Nav />
      <Posts />
    </div>
  );
}

export default PostsRoute;
