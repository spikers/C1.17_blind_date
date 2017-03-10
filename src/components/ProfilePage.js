import React, {Component} from 'react';
import {Link} from 'react-router';

class ProfilePage extends Component {
    render(){
      return (
        <div> 
          <h1>Profile Page</h1>
          <Link to='/events'>Events</Link>
        </div>
      )
    }
  }

export default ProfilePage;