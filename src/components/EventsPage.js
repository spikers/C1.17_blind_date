import React, {Component} from 'react';
import {Link} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import EventsGrid from './EventsGrids';
import {connect} from 'react-redux';
import {getEvents, sendEventChoice} from './actions';
import Logo from './Logo';
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
  },
  flip: {
    width: "90%",
    height: "auto",
    margin: "auto"
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
    }
    return (
      <div>
        <AppBar 
          title="Events"
          iconElementRight={<FlatButton label = "Log Out"/>}
          />
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
        <div className={css.container}>
          <Paper className={css.shadow} circle={true} zDepth={1}>
            <Link to="/results"><img className={css.flip} src={require("./img/flip.png")} alt=""/></Link>
          </Paper>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state){
  return {events: state.events.events}
}
export default connect(mapStateToProps, {getEvents, sendEventChoice})(EventsPage);