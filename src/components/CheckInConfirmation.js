import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

/**
 * A modal dialog can only be closed by selecting one of the actions.
 */
export default class CheckInConfirmation extends React.Component {
  state = {
    open: false,
  };

  handleClick = ()=>{
    this.handleOpen()
  }
  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit =(email, activity) =>{
    this.setState({open: false});
    this.props.handleCheckIn(email, activity)
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={()=>this.handleSubmit(this.props.secondEmail, this.props.eventLocation)}
      />,
    ];

    return (
      <div>
        <FlatButton label="Check-In" onTouchTap={this.handleClick}/>
        <Dialog
          title="Confirm Check-In"
          actions={actions}
          modal={true}
          open={this.state.open}
        >
          Notify your date that you're at the event?
        </Dialog>
      </div>
    );
  }
}