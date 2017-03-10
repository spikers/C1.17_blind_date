import React from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
 
const eventTypes = ['Activities', 'Live', 'Movies', 'Outdoors'];
const EventsButtonGroup = (props)=>{

  let eventButtons = eventTypes.map((eventType, index)=>{
    let activeButton = false;
    if (index == props.activeButton){
      activeButton = true;
    }else{
      activeButton = false;
    }
    return (
      <Button key={index + eventType} id={index} active={activeButton}>{eventType}</Button>
    );
  })
  return (
    <ButtonGroup bsSize="lg"onClick={(e)=>props.handleButtonPress(e)}>
      {eventButtons}
    </ButtonGroup>
  )
}

export default EventsButtonGroup;