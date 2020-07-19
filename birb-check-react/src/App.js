import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Posts from './Routes/postsRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Posts} />
      </Switch>
    </Router>
  );
}

export default App;
