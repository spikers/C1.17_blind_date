import React, {Component} from 'react';
import {Link} from 'react-router';

class EventsPage extends Component {
    render(){
        return(
          <div>
            <h1>Events Page</h1>
            <Link to="/results">Results</Link>
          </div>
        )
    }
  }

export default EventsPage;