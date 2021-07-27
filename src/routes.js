import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import ClientDetails from './pages/ClientDetails';
import Main from './pages/Main';
import NewClient from './pages/NewClient';

export default function AppRoutes() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/client/:id" component={ClientDetails} />
          <Route path="/new-client" component={NewClient} />
        </Switch>
    </Router>
  );
}