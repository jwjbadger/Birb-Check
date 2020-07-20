import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PostsRoute from './Routes/postsRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={PostsRoute} />
      </Switch>
    </Router>
  );
}

export default App;
