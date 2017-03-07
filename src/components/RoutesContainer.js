import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import Container from './container';
import LoginPage from './loginpage';
import EventsPage from './eventspage';
import ResultsPage from './resultspage';
import ProfilePage from './profilepage';
import NotFound from './notfound';
import Nav from './nav';

class RoutesContainer extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={LoginPage} />
          <Route path='/events' component={EventsPage} />
          <Route path='/results' component={ResultsPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='*' components={NotFound} />
      </Router>
    )
  }
}
export default RoutesContainer;