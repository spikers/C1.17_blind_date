import React, {Component} from 'react';
import {Link} from 'react-router';
import Logo from './logo'

class ProfilePage extends Component {
    render(){
      return (
        <div> 
          <Logo/>
          <h1>Profile Page</h1>
          <Link to='/events'>Events</Link>
        </div>
      )
    }
  }

export default ProfilePage;