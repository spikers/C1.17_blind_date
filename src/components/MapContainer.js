import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Directions from 'material-ui/svg-icons/maps/directions';
import Chat from 'material-ui/svg-icons/communication/chat';
import GMap from './Gmaps';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class MapContainer extends React.Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

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
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div>
        <FlatButton icon={<Directions/>} onTouchTap={this.handleOpen}/>
        <Dialog
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
          contentStyle={{width: "90%", height: "80vh", backgroundColor:"none"}}
        >
        <GMap initialCenter={!this.props.geolocation ? {lat: 33.6362183, lng: -117.7416661} : this.props.geolocation} restaurantLocation={this.props.activity || ''} activityLocation={this.props.restaurant || ''}/>
        </Dialog>
      </div>
    );
  }
}