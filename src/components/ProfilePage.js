import React, {Component} from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class ProfilePage extends Component {
    render(){
      return (
        <div> 
          <AppBar 
          title="User Profile"
          iconElementRight={<FlatButton label = "Log Out"/>}
          />
          <h1>Profile Page</h1>
          <Link to='/events'>Events</Link>
        </div>
      )
    }
  }

export default ProfilePage;