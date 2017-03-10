import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
 

const EventsButtonGroup = (props)=>{
  return (
    <ButtonGroup bsSize="lg"onClick={(e)=>props.handleButtonPress(e)}>
      <Button id="0">Activities</Button>
      <Button id="1">Live</Button>
      <Button id="2">Movies</Button>
      <Button id="3">Outdoors</Button>
    </ButtonGroup>
  )
}

export default EventsButtonGroup;