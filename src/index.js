import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './components/reducers';
import promise from 'redux-promise';
import RoutesContainer from './components/RoutesContainer';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

const createStoreWithMiddleWare = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store = {createStoreWithMiddleWare(reducers)}>
    <RoutesContainer/>
  </Provider>,
    document.getElementById('root')
);