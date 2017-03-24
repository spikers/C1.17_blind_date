import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default (props)=>(
  <div>
    <AppBar 
      title="Wynk ;)"
      iconElementRight={<FlatButton label = "Log Out"/>}
    />
    {props.children}
  </div>
)