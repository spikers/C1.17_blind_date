import React from 'react';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router';

const Nav = () => {
  return(
    <div>
      <ul>
        <li><Link to='/'>Login</Link></li>
        <li><Link to='/profile'>Profile</Link></li>
        <li><Link to='/events'>Events</Link></li>
        <li><Link to='/results'>Results</Link></li>
      </ul>
    </div>
  )
}

export default Nav;