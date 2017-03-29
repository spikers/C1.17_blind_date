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
import AboutUs from './AboutUs';
import Faq from './Faq';
import ContactUs from './ContactUs';
import NotFound from './NotFound';
import App from './App';
import requireAuth from './RequireAuth';
import homeRedirect from './HomePageAuth'

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
          <IndexRoute component={homeRedirect(LoginPage)}/>
          <Route path='/events' component={requireAuth(EventsPage)} />
          <Route path='/results' component={requireAuth(ResultsPage)}/>
          <Route path='/profile' component={requireAuth(ProfilePage)} />
          <Route path='/aboutus' component={AboutUs} />
          <Route path='/faq' component={Faq} />
          <Route path='/contactus' component={ContactUs} />
          <Route path='*' components={NotFound} />
        </Route>
      </Router>
      </MuiThemeProvider>
    )
  }
}

export default RoutesContainer;