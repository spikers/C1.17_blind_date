import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';
import EventsGrid from './EventsGrids';
import {connect} from 'react-redux';
import {getEvents, setEventChoice, getProfileDelayed} from './actions';
import Logo from './Logo';
import Spinner from './Spinner'
import css from './styles/EventsPage.css'
import axios from 'axios'
import {store} from '../index.js'
import {browserHistory} from 'react-router'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  }
};

const paperStyle = {
    margin: 10,
}
const instance = axios.create({
  headers:{
    'Content-Type' : 'application/x-www-form-urlencoded'
  }
});

const BASE_URL = 'http://54.202.15.233:8000/api/';

function sendEventChoice(id, choice){
  console.log('event choice sent')
var id = id
var data = "user=" + id + "&activity=" + encodeURIComponent(JSON.stringify(choice));
var xhr = new XMLHttpRequest();
xhr.addEventListener("load", function () {
        // getProfileDelayed(id)
    console.log('id', id)
    instance.get(`${BASE_URL}user/${id}`)
    .then(resp=>{
      store.dispatch({
        type: "GET_PROFILE",
        payload: resp
      })
      browserHistory.push('/results')
    })
    .catch(err=>{
      console.log('Oops, error!', err)
    })
  }.bind(this)); //callback is bound in order to maintain "id"

xhr.open("POST", "http://54.202.15.233:8000/api/hangout");
xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");

xhr.send(data);
}


class EventsPage extends React.Component {
  static contextTypes =  {
        router: PropTypes.object
      }
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  handleEventChoice(id, choice){
    sendEventChoice(id, choice)
  }

  componentWillMount(){
    this.props.getEvents();
  }

  render() {
    const eventSlides=[];    
    const tabs=[];
    let x;
    if (this.props.events){
      for (x in this.props.events.data){
        eventSlides.push(
          <div key={x} style={styles.slide}>
            <EventsGrid activity={x}/>
          </div>
          )
        let tabCount = 0
        tabs.push(x)
      }
    }else{
      return (
        <div>
          <div style=
          {{
            width: "100vw",
            height:"90vh", 
            display: "flex",
            alignItems: "center",
            justifyContent: "center" 
          }}>
            <Spinner/>
          </div>
        </div>
      )
    }

    let name = this.props.eventChoice ? this.props.eventChoice.name : null
    let showing = {display:'none'};
    if (this.props.eventChoice){
      showing = {};
    }
    return (
      <div>
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label={tabs[0]} value={0} />
          <Tab label={tabs[1]} value={1} />
          <Tab label={tabs[2]} value={2} />
        </Tabs>

        <Paper style={paperStyle}> 
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
          {eventSlides}
          </SwipeableViews>
        </Paper>

        <Paper style={showing} className={css.eventChoice} zDepth={1}>
          <p>Current Selection: <strong>{name}</strong> </p>
          <h1>Are you ready to <span style={{color:'#C2185B'}}><strong>WYNK?</strong></span></h1>
        </Paper>
        
        <div style={showing} className={css.container}>
          <div className={css.shadow} onClick={this.handleEventChoice.bind(this, this.props.user.fbToken, this.props.eventChoice)}>
            {/*<div className={css.shadow} circle={true} zDepth={2} onClick={this.handleEventChoice.bind(this, this.props.user.fbToken, this.props.eventChoice)}>*/}
            <img className={css.flip} src={require("./img/wynk.png")} alt="wynk"/>
          </div>
          <Link style={{position:"absolute"}} to='/results'>I'll choose later. Show me my dates!</Link>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {
    events: state.events.events,
    eventChoice: state.events.eventChoice,
    user: state.user.user,
    authenticated: state.authenticated
    }
}
export default connect(mapStateToProps, {getEvents, setEventChoice})(EventsPage);