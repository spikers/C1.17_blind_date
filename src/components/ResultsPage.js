import React, {Component} from 'react';
import {Link} from 'react-router';
import ResultsItem from './ResultsItem';
import {connect} from 'react-redux';
import {getProfile, getSecondProfile, getRestaurant} from './actions'
import axios from 'axios'

class ResultsPage extends Component {
  componentWillMount(){
    this.props.getRestaurant()
    if (this.props.user === null){
      this.props.getProfile(136173360242729)
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log(this.props.restaurant)
    if (this.props.secondUser != undefined && this.props.restaurant != undefined){
      return false
    }
    return true
  }

  createContentObj(type){
    console.log('props in createContent', this.props)
    switch (type){
      case 'person':
        return {
          type,
          title: this.props.secondUser.name,
          content: this.props.secondUser.biography,
          image: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/5/005/095/0d0/0796c17.jpg'
        }
      case 'restaurant':
      console.log('props in restaurant switch', this.props)
        if (this.props.restaurant == null){
          return {}
        }
        return {
            type,
            title: this.props.restaurant.name,
            content: this.props.restaurant.display_phone,
            image: this.props.restaurant.image_url
        }
      case 'prop':
        return {
          type,
          title: 'Teddy Bear',
          content: 'Bring a teddy bear to help your date find you!',
          image: 'https://images-na.ssl-images-amazon.com/images/I/81wpQlT3T5L._AC_UL320_SR278,320_.jpg'
        }
      default:
        return {}
    }
  }

  render(){
    let fullDate = '';
    let secondPerson = null;
    if (this.props.user!== null && this.props.user.hangouts[0].second_person != null){
      secondPerson = this.props.user.hangouts[0].first_person === this.props.userfbToken ? this.props.user.hangouts[0].second_person : this.props.user.hangouts[0].first_person
      this.props.getSecondProfile(secondPerson)
    }
    return (
      <div>
          <ResultsItem style={{display:"block", margin: "auto"}} secondUser={secondPerson} content={this.props.secondUser != null ? this.createContentObj('person') : null}/>
          <ResultsItem style={{display:"block", margin: "auto"}} secondUser={secondPerson} content={this.createContentObj('restaurant')}/>
          <ResultsItem style={{display:"block", margin: "auto"}} secondUser={secondPerson} content={this.props.secondUser != null ? this.createContentObj('prop') : null}/>
      </div>
    )
  }
}

function mapStateToProps(state){
  console.log('state in results', state)
  return {
    user: state.user.user,
    secondUser: state.user.secondUser,
    events: state.events.events,
    restaurant: state.user.restaurant
  }
}

export default connect(mapStateToProps, {getProfile, getSecondProfile, getRestaurant})(ResultsPage);