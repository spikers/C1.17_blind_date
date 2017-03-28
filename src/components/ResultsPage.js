import React, {Component} from 'react';
import {Link} from 'react-router';
import ResultsItem from './ResultsItem';
import {connect} from 'react-redux';
import {getProfile, getSecondProfile, getRestaurant} from './actions'
import axios from 'axios'
import Logo from './Logo'
import styles from './styles/ResultsPage.css'

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
  componentWillMount(){
    this.props.getRestaurant()
    if (this.props.user === null){
      this.props.getProfile(100162377184177)
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if (this.props.secondUser != undefined && this.props.restaurant != undefined){
      return false
    }
    return true
  }

  render(){
    let fullDate = '';
    let secondPerson = null;
    let resultsArr = [];
    if (this.props.user!== null && this.props.user.hangouts[0].second_person != null && secondPerson===null){
      secondPerson = this.props.user.hangouts[0].first_person === this.props.userfbToken ? this.props.user.hangouts[0].second_person : this.props.user.hangouts[0].first_person
      this.props.getSecondProfile(secondPerson)
    }
    if(this.props.user && this.props.secondUser && this.props.restaurant){
      resultsArr = this.props.user.hangouts.map((hangout, index)=>{
        return(
          <ResultsItem expanded={index === 0 ? true:false} key={index} index={index} secondUser={secondPerson} hangout={hangout}/>
        )
      })
    }
    return (        
      <div style={{width:"95vw", margin: "2.5vw auto"}}>
          {resultsArr}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.user.user,
    secondUser: state.user.secondUser,
    events: state.events.events,
    restaurant: state.user.restaurant,
    authenticated: state.authenticated
  }
}

export default connect(mapStateToProps, {getProfile, getSecondProfile, getRestaurant})(ResultsPage);