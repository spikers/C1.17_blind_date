import React, { Component } from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import {pink700, pink900, purple800, white, darkWhite, grey100, grey300, grey400, grey500, darkBlack, fullBlack} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Container from './container';
import LoginPage from './loginpage';
import EventsPage from './eventspage';
import ResultsPage from './resultspage';
import ResultsInfo from './resultsinfo';
import ProfilePage from './profilepage';
import NotFound from './notfound';
import Nav from './nav';

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color:pink700,
    primary2Color: pink900,
    accent1Color:purple800,
    textColor: white,
    alternateTextColor: darkBlack,
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
        <Route path='/' component={LoginPage} />
          <Route path='/events' component={EventsPage} />
          <Route path='/results' component={ResultsPage}/>
          <Route path='/profile' component={ProfilePage} />
          <Route path='*' components={NotFound} />
      </Router>
      </MuiThemeProvider>
    )
  }
}

export default RoutesContainer;