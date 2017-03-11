import React from 'react';
import ReactDOM from 'react-dom';
import RoutesContainer from './components/routescontainer';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

ReactDOM.render(
  <RoutesContainer/>,
    document.getElementById('root')
);