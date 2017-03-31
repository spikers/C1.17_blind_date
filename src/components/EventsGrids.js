import React from 'react';
import {connect} from 'react-redux';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Star from 'material-ui/svg-icons/toggle/star';
import {getEvents, setEventChoice} from './actions'

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    width: 500,
    height: 540,
    overflowY: 'auto',
  },
};

const EventsGrids = (props) => {

  let eventsArr=props.events.data[props.activity].businesses
  let tilesData = eventsArr.map((location, index)=>(
    {
      img: location.image_url,
      title: location.name,
      featured: index === 0 ? true : false,
    }
    ))

  let tilesArr = renderTiles();

  function renderTiles(){ 
    return tilesData.map((tile) => {
      let actionIcon;
      if (props.eventChoice !== undefined){
        if (props.eventChoice.image_url === tile.img){
          actionIcon = <IconButton><Star color="yellow"/></IconButton>
        }
        else{
          actionIcon = <IconButton><StarBorder color="white"/></IconButton>
        }
      }
      return (
        <GridTile
          key={tile.img}
          title={tile.title}
          actionIcon={actionIcon}
          actionPosition="right"
          titlePosition="top"
          titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
          cols={tile.featured ? 2 : 1}
          rows={tile.featured ? 2 : 1}
        >
          <img src={tile.img} />
          <img style={{position:"absolute", bottom: "0", width: "20%", height: "auto"}}src={tile.featured ? require('./img/featured.png') : ''} alt="featured"/>
        </GridTile>
      )})
  }

  function handleClick(e){
    for (let j = 0; j < eventsArr.length; j++){
      if (tilesData[j].img === e.target.src){
        props.setEventChoice(eventsArr[j])
      }
    tilesArr = renderTiles();
    }
  }

  return (
    <div 
      style={styles.root}
      onClick={handleClick}
    >
      <GridList
        cols={2}
        cellHeight={180}
        padding={1}
        style={styles.gridList}
      >
      {tilesArr}
      </GridList>
    </div>
  )
}

function mapStateToProps(state){
  return {
    events: state.events.events,
    eventChoice: state.events.eventChoice
  }
}

export default connect(mapStateToProps, {setEventChoice, getEvents})(EventsGrids)