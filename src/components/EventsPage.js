import React, {Component} from 'react';
import {Link} from 'react-router';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import EventsGrid from './EventsGrids';

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
};

const paperStyle = {
    margin: 10,
    height: "90vh"
}

export default class EventsPage extends React.Component {

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

  render() {
    return (
      <div>
        <AppBar 
          title="Events"
          iconElementRight={<FlatButton label = "Log Out"/>}
          />
        <Paper style={paperStyle}> 
        <Tabs
          onChange={this.handleChange}
          value={this.state.slideIndex}
        >
          <Tab label="Activities" value={0} />
          <Tab label="Movies" value={1} />
          <Tab label="Live" value={2} />
          <Tab label="Outdoors" value={3} />
        </Tabs>
        <SwipeableViews
          index={this.state.slideIndex}
          onChangeIndex={this.handleChange}
        >
          <div>
            <EventsGrid/>
          </div>
          <div style={styles.slide}>
            <EventsGrid/>
          </div>
          <div style={styles.slide}>
            <EventsGrid/>
          </div>
          <div style={styles.slide}>
            <EventsGrid/>
          </div>
        </SwipeableViews>
        </Paper>
      </div>
    );
  }
}