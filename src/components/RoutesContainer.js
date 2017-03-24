import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import {pink700, pink900, purple800, white, darkWhite, grey100, grey300, grey400, grey500, darkBlack, fullBlack} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from './Container';
import LoginPage from './LoginPage';
import EventsPage from './EventsPage';
import ResultsPage from './ResultsPage';
import ResultsInfo from './ResultsInfo';
import ProfilePage from './ProfilePage';
import NotFound from './NotFound';
import App from './App';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color:pink700,
    primary2Color: pink900,
    accent1Color:purple800,
  },
  appBar: {
    height: 56
  }
});


class RoutesContainer extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
      <Router history={browserHistory}>
        <Route path='/' component={App}>
          <IndexRoute component={LoginPage}/>
          <Route path='/events' component={EventsPage} />
          <Route path='/results' component={ResultsPage}/>
          <Route path='/profile' component={ProfilePage} />
          <Route path='*' components={NotFound} />
        </Route>
      </Router>
      </MuiThemeProvider>
    )
  }
}

export default RoutesContainer;