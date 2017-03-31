import React, {Component} from 'react';
import styles from './styles/ResultsItem.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Directions from 'material-ui/svg-icons/maps/directions';
import Chat from 'material-ui/svg-icons/communication/chat';
import MapContainer from './MapContainer';
import CheckIn from './CheckInConfirmation';

class ResultsItem extends Component {
  render(){

    let {activity, restaurant} = this.props.hangout || {}
    // let matchNotification;
    // let matchNotificationColor;
    // let cardActionsVisibility;
    if (this.props.matched){
      var matchNotification = "Matched!"
      var matchNotificationColor = {color: "green"}
      var cardActionsVisibility = {display:"initial"}
   }else{ "Match Pending..."
      var matchNotification = "Match Pending..."
      var matchNotificationColor = {color: "red"}
      var cardActionsVisibility = {display:"none"}
   }
    return (
      <Card
        initiallyExpanded = {false}
        style={{margin: "2vw auto"}}
      >
        <CardHeader
          actAsExpander={this.props.matched}
          showExpandableButton={false}
        >
        <div className = {styles.cardHeader}>
          <div style={{display:"inline-block", width: "50%", display:"flex",alignItems:"center"}}><img style={{height: "auto", width: "90%", height: "auto", boxShadow: "2%"}} src={activity.image_url || ''} alt="activity"/></div>
          <div style={{display:"inline-block", width: "50%"}}>
            <p style={{
              whiteSpace: "nowrap",
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%'}}>{activity.name}</p>
            <p style = {matchNotificationColor}><strong>{matchNotification}</strong></p>
          </div>
        </div>
        </CardHeader>
        <CardActions style={cardActionsVisibility}>
          <div style = {{width:"100%", display: "flex", justifyContent: "space-around"}}>   
            <CheckIn
              handleCheckIn = {this.props.handleCheckIn}
              secondEmail={this.props.secondUser && this.props.secondUser.email}
              eventLocation={activity.coordinates}
            />
            <MapContainer style={{display:"inline-block"}} geolocation={this.props.geolocation} activity={activity} restaurant={restaurant}/>
            <a href={"http://wynk.world/chat?" + "fbToken=" + this.props.user} target="_blank"><FlatButton
              style={{display:"inline-block"}}
              icon={<Chat/>}/></a>
          </div>
        </CardActions>
        
        <CardText expandable={true}>
          <p>Name: {activity.name}</p>
          <p>Phone: {activity.display_phone}</p>
          <p>Address: {(activity.location && activity.location.address1) || 'Address Unavailable'}, {activity.location.city} {activity.location.zip_code} </p>
          <div><a href={activity.url}><div style={{height: "2em", verticalAlign: "middle"}}><img style={{height: "100%", width:"auto", verticalAlign:"middle"}} src={require("./img/yelp_burst.png")} alt="yelp" target="_blank"/>Check it out on Yelp!</div></a></div>
            <Card
              initiallyExpanded={false}
              zDepth={2}
            >
              <CardHeader
                title={(this.props.secondUser && this.props.secondUser.given_name) || 'Check back soon!'}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                <div><img src={this.props.secondUser && this.props.secondUser.profile_picture} alt="profile pic"/></div>
                <p>Age: {this.props.secondUser && this.props.secondUser.age}</p>
                <p>Interests: {this.props.secondUser && this.props.secondUser.interests}</p>
                <p>{this.props.secondUser && this.props.secondUser.biography}</p>
              </CardText>
            </Card>
            <Card
              zDepth={2}
            >
              <CardHeader
                title={restaurant && restaurant.name || 'Sorry, Restaurant Unavailable'}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                <div><img style={{width:"50%", heigh:"auto"}}src={restaurant && restaurant.image_url || ''} alt="restaurant"/></div>
                <p>Phone: {restaurant && restaurant.display_phone || ''}</p>
                <p>Address: {(restaurant && restaurant.location && restaurant.location.address1) || 'Address Unavailable'}, {restaurant && restaurant.location.city} {restaurant && restaurant.location.zip_code} </p>
                <div><a href={restaurant && restaurant.url}><div style={{height: "2em", verticalAlign: "middle"}}><img style={{height: "100%", width:"auto", verticalAlign:"middle"}} src={require("./img/yelp_burst.png")} alt="yelp" target="_blank"/>Check it out on Yelp!</div></a></div>
              </CardText>
            </Card>
        </CardText>
      </Card>
   )
  }
}
export default ResultsItem;