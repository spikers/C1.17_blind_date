import React, {Component} from 'react';
import {Link} from 'react-router';
import ResultsItem from './ResultsItem';
import {connect} from 'react-redux';
import {getProfile, getSecondProfile} from './actions'
import axios from 'axios'
import Logo from './Logo'
import styles from './styles/ResultsPage.css'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Chat from 'material-ui/svg-icons/communication/chat';
import Snackbar from 'material-ui/Snackbar';
import RaisedButton from 'material-ui/RaisedButton';


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

  handleCheckIn = () => {
    let loc1 = new google.maps.LatLng(this.props.geolocation.lat, this.props.geolocation.lng)
    let loc2 = new google.maps.LatLng(this.props.user.hangouts.activity.coordinates.latitude, this.props.user.hangouts.activity.coordinates.longitude)
    let distance = google.maps.geometry.spherical.computeDistanceBetween(loc1, loc2)
    if (distance < 1000){
      //need to hit the endpoint somehow
    }
  }

  render(){
    let fullDate = '';
    let secondPerson = null;
    let resultsArr = [];
    if (this.props.user && this.props.user.hangouts && this.props.user.hangouts[0] && this.props.user.hangouts[0].second_person != null && secondPerson===null){
      secondPerson = this.props.user.hangouts[0].first_person === this.props.userfbToken ? this.props.user.hangouts[0].second_person : this.props.user.hangouts[0].first_person
      this.props.getSecondProfile(secondPerson)
    }
    if(this.props.user && this.props.user.hangouts){
      resultsArr = this.props.user.hangouts.map((hangout, index)=>{
        return(
          <ResultsItem key={index} index={index} secondUser={this.props.secondUser || null} hangout={hangout} geolocation={this.props.geolocation || ''} handleCheckIn={this.handleCheckIn.bind(this)}/>
        )
      })
    }

    return (        
      <div style={{width:"95vw", margin: "2.5vw auto"}}>
          {resultsArr}
          <FloatingActionButton style = {{position:"fixed", bottom: "4%", right: "4%", zIndex:"2"}}>
            <Chat/>
          </FloatingActionButton>  
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user.user,
    secondUser: state.user.secondUser,
    authenticated: state.authenticated,
    geolocation: state.user.geolocation
  }
}

export default connect(mapStateToProps, {getProfile, getSecondProfile})(ResultsPage);