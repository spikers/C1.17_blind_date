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
    return (
      <Card
        initiallyExpanded = {false}
        style={{margin: "2vw auto"}}
      >
        <CardHeader
          actAsExpander={true}
          showExpandableButton={true}
        >
        <img style={{width: "30%", height: "auto", margin: "auto", display:"inline-block"}} src={activity.image_url} alt="activity"/><p style={{verticalAlign: "middle", textAlign:"right", display:"inline-block"}}>{activity.name}</p>
        </CardHeader>
        <CardText expandable={true}>
          <p>Phone: {activity.display_phone}</p>
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