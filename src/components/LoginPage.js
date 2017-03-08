import React, {Component} from 'react';
import {Link} from 'react-router';

class LoginPage extends Component {
    render(){
        let path = '/profile';
        //create some function to detect session to swap path between profile and events on Submit
        return(
          <div className="container">
            <h1>Login Page</h1>
            <Link to={path}>Submit</Link>
          </div>
        )
    }
  }

export default LoginPage;