import React from 'react';
import {Carousel, CarouselItem, CarouseCaption} from 'react-bootstrap';
import styles from './styles/eventscarousel.css';

const EventsCarousel = React.createClass({
  getInitialState() {
    return {
      index: 0,
      direction: null
    };
  },

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
    this.props.updateButton(selectedIndex)
  },

  componentWillReceiveProps(newProp){
    let direction = newProp.indexSelection > this.state.index ? 'next' : 'prev  '
    this.setState((prevState, props)=>({index:props.indexSelection, direction: direction}));
  },

  render() {
    return (
      <Carousel activeIndex={this.state.index} direction={this.state.direction} onSelect={this.handleSelect}>
        <Carousel.Item>
          <img width={900} height={500} alt="activities" src={this.props.activities.image_url}/>
          <Carousel.Caption>
            <h3>Activity</h3>
            <p>{this.props.activities.name}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={900} height={500} alt="live" src={this.props.live.image_url}/>
          <Carousel.Caption>
            <h3>Live</h3>
            <p>{this.props.live.name}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={900} height={500} alt="movies" src={this.props.movies.image_url}/>
          <Carousel.Caption>
            <h3>Movies</h3>
            <p>{this.props.activities.name}</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img width={900} height={500} alt="outdoors" src={this.props.outdoors.image_url}/>
          <Carousel.Caption>
            <h3>Outdoors</h3>
            <p>{this.props.outdoors.name}</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    );
  }
});

export default EventsCarousel;