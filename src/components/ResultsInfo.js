import React from 'react'
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import styles from './styles/ResultsInfo.css'

const ResultsInfo = (props) => {
  let infoClass = props.clicked ? '' : styles.hide;
  let content = props.content ? props.content : {}
  if (content !== {}){
    console.log('this is content obj', props.content)
    return (
      <div className={styles.content + ' ' + infoClass}>
        <Card>
          <CardHeader
            title={props.content ? props.content.title : null}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p>{props.content ? props.content.content : null}</p>
            <Card>
          <CardHeader
            title={props.content ? props.content.title : null}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p>{props.content ? props.content.content : null}</p>
        </CardText>
        
      </Card>
      <Card>
          <CardHeader
            title={props.content ? props.content.title : null}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p>{props.content ? props.content.content : null}</p>
        </CardText>
        
      </Card>
     
        </CardText>
        
      </Card>
      </div>
    )
  }else{
    return false
  }
}

export default ResultsInfo;