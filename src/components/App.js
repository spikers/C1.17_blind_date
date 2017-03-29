import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import Map from './GmapsTest';

export default (props)=>{
  return(
  <div>
    <AppBar 
      title="Wynk ;)"
      iconElementRight={<FlatButton label = "Log Out"/>}
    />
    {props.children}
  </div>
)}