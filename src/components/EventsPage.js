import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';
import EventsGrid from './EventsGrids';
import {connect} from 'react-redux';
import {getEvents, sendEventChoice, setEventChoice} from './actions';
import Logo from './Logo';
import Spinner from './Spinner'
import css from './styles/EventsPage.css'

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
    this.props.sendEventChoice(id, choice)
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
          <h1>Are you ready to <span style={{color:'#C2185B'}}><strong>FLIP?</strong></span></h1>
        </Paper>

        <div style={showing} className={css.container}>
          <Paper className={css.shadow} circle={true} zDepth={2} onClick={this.handleEventChoice.bind(this, this.props.user.fbToken, this.props.eventChoice)}>
            <Link to='/results'><img className={css.flip} src={require("./img/wynk.png")} alt="wynk"/></Link>
          </Paper>
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
export default connect(mapStateToProps, {getEvents, setEventChoice, sendEventChoice})(EventsPage);