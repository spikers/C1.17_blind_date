import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

export default (props)=>{
  let hide = {};
  if (props.router.location.pathname === '/'){
    hide = {display:"none"}
  }else{
    hide = {}
  }
  return(
  <div>
    <AppBar 
      title="Wynk ;)"
      iconElementRight={<FlatButton label = "Log Out"/>}
      style={hide}
    />
    {props.children}
  </div>
)}