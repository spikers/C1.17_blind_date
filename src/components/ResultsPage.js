import React, {Component} from 'react';
import {Link} from 'react-router';
import ResultsItem from './ResultsItem';
import {connect} from 'react-redux';
import {getProfile, getSecondProfile, checkInNotification} from './actions'
import Logo from './Logo'
import styles from './styles/ResultsPage.css'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Chat from 'material-ui/svg-icons/communication/chat';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';


const mainTitleStyle = {
    textAlign: 'center',
    fontSize: '3.5vh',
    fontWeight: 'bold',
    color: 'rgb(194, 24, 91)'
}
const subtitleStyle = {
    textAlign: 'center',
    fontSize: '3vh',
    fontWeight: 'bold'
}
class ResultsPage extends Component {

  shouldComponentUpdate(nextProps, nextState){
    if (this.props.secondUser != undefined){
      return false
    }
    return true
  }

  handleRequestClose(){
    this.props.checkInNotification(false)
  }

  handleCheckIn = (email, activity) => {
    // let loc1 = new google.maps.LatLng(this.props.geolocation.lat, this.props.geolocation.lng)
    let loc1 = new google.maps.LatLng(activity.latitude, activity.longitude)
    let loc2 = new google.maps.LatLng(activity.latitude, activity.longitude)
    let distance = google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2)
    if (distance < 1000){
      this.props.checkInNotification(true)
      const instance = axios.create({
      headers:{
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    });
    instance.post('http://54.202.15.233:8000/api/hangout/email', {"email": email}).then((res)=>{
    })
  }else{
      this.props.checkInNotification(false)
    }
  }

  render(){
    let fullDate = '';
    // let secondPerson = null;
    let resultsArr = [];
    if(this.props.user && this.props.user.hangouts){
      resultsArr = this.props.user.hangouts.map((hangout, index)=>{
        let matched = false;
      //   if (this.props.user && this.props.user.hangouts && this.props.user.hangouts[0] && this.props.user.hangouts[0].second_person != null && secondPerson===null){
      // secondPerson = this.props.user.hangouts[index].first_person === this.props.userfbToken ? this.props.user.hangouts[index].second_person : this.props.user.hangouts[index].first_person
      if (hangout.second_person){
        this.props.getSecondProfile(hangout.first_person == this.props.userfbToken ? hangout.second_person : hangout.first_person)
        matched = true
      }
        return(
          <ResultsItem key={index} index={index} user = {this.props.user.fbToken} secondUser={this.props.secondUser || null} hangout={hangout} geolocation={this.props.geolocation || ''} handleCheckIn={this.handleCheckIn.bind(this)} matched = {matched}/>
        )
      })
    }

    return (        
      <div style={{width:"95vw", margin: "2.5vw auto"}}>
          {resultsArr}
          {/*<a href="http://wynk.world/chat">
          <FloatingActionButton style = {{position:"fixed", bottom: "4%", right: "4%", zIndex:"2"}}>
            <Chat/>
          </FloatingActionButton>  
          </a>*/}
          <Snackbar
          open={this.props.checkIn}
          message="Your date has been notified of your check-in!"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose.bind(this)}
        />
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user.user,
    secondUser: state.user.secondUser,
    authenticated: state.authenticated,
    geolocation: state.user.geolocation,
    checkIn: state.events.checkIn
  }
}

export default connect(mapStateToProps, {getProfile, getSecondProfile, checkInNotification})(ResultsPage);