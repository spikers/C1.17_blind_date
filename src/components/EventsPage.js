import React, {Component} from 'react';
import {Link} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';
import EventsGrid from './EventsGrids';
import {connect} from 'react-redux';
import {getEvents, sendEventChoice} from './actions';
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

  componentWillMount(){
    this.props.getEvents();
  }

  render() {
    console.log('props on eventsPage', this.props)
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
          <Tab label={tabs[3]} value={3} />
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
          <Paper className={css.shadow} circle={true} zDepth={2}>
            <Link to="/results" onClick={()=>(this.props.sendEventChoice(this.props.user.fbToken, this.props.eventChoice))}><img className={css.flip} src={require("./img/flip.png")} alt=""/></Link>
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
    user: state.user.user
    }
}
export default connect(mapStateToProps, {getEvents, sendEventChoice})(EventsPage);