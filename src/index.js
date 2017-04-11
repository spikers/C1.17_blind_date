import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import reducers from './components/reducers';
import promise from 'redux-promise';
import RoutesContainer from './components/RoutesContainer';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

const createStoreWithMiddleWare = applyMiddleware(reduxThunk, promise)(createStore);
export const store = createStoreWithMiddleWare(reducers)

ReactDOM.render(
  <Provider store = {store}>
    <RoutesContainer/>
  </Provider>,
    document.getElementById('root')
);