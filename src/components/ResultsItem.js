import React, {Component} from 'react';
import ResultsImage from './ResultsImage';
import ResultsInfo from './ResultsInfo';
import styles from './styles/ResultsItem.css';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

class ResultsItem extends Component {
  render(){
    console.log('props in resultsitem', this.props)
    let activity = this.props.hangout.activity || {}
    let matchNotification = this.props.secondUser ? "Match Found!": "Match Pending..."
    return (
      <Card
        initiallyExpanded = {false}
        style={{margin: "2vw auto"}}
      >
        <CardHeader
          actAsExpander={true}
          showExpandableButton={false}
        >
        <div className = {styles.cardHeader}>
          <div style={{display:"inline-block", width: "50%", display:"flex",alignItems:"center"}}><img style={{height: "auto", width: "90%", height: "auto", boxShadow: "2%"}} src={activity.image_url} alt="activity"/></div>
          <div style={{display:"inline-block", width: "50%"}}>
            <p>{activity.name}</p>
            <p><strong>{matchNotification}</strong></p>
          </div>
        </div>
        </CardHeader>
        <CardText expandable={true}>
          <p>Phone: {activity.display_phone}</p>
          <p>Address: {activity.location.address1}, {activity.location.city} {activity.location.zip_code} </p>
          <div><a href={activity.url}><div style={{height: "2em", verticalAlign: "middle"}}><img style={{height: "100%", width:"auto", verticalAlign:"middle"}} src={require("./img/yelp_burst.png")} alt="yelp" target="_blank"/>Check it out on Yelp!</div></a></div>
            <Card
              initiallyExpanded={true}
              zDepth={2}
            >
              <CardHeader
                title="Person Info"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </CardText>
            </Card>
            <Card
              zDepth={2}
            >
              <CardHeader
                title="Restaurant Info"
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </CardText>
            </Card>
        </CardText>
      </Card>
   )
  }
}
export default ResultsItem;