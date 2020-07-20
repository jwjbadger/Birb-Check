import React from 'react';
import Post from '../Components/Post/Post';
import { useLocation } from 'react-router-dom';

function PostsRoute() {
  const location = useLocation().pathname;

  return (
    <div>
      <Post _id={location.substring(6)} />
    </div>
  );
}

export default PostsRoute;
