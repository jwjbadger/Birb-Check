import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PostsRoute from './Routes/postsRoute';
import PostRoute from './Routes/postRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={PostsRoute} />
        <Route path='/post/:_id' exact component={PostRoute} />
      </Switch>
    </Router>
  );
}

export default App;
