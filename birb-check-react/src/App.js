import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PostsRoute from './Routes/postsRoute';
import PostRoute from './Routes/postRoute';
import SubmitRoute from './Routes/submitRoute';
import LoginRoute from './Routes/loginRoute';
import ImageRoute from './Routes/imageRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={PostsRoute} />
        <Route path='/submit' exact component={SubmitRoute} />
        <Route path='/post/:_id' exact component={PostRoute} />
        <Route path='/login' exact component={LoginRoute} />
        <Route path='/images' exact component={ImageRoute} />
      </Switch>
    </Router>
  );
}

export default App;
