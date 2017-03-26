import React, {Component} from 'react';
import {Link} from 'react-router';
import ResultsItem from './ResultsItem';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

const mainTitleStyle = {
    textAlign: 'center',
    fontSize: '3.5vh',
    fontWeight: 'bold',
    color: 'rgb(194, 24, 91)'
}
const subtitleStyle = {
    textAlign: 'center',
    fontSize: '3vh',
    fontWeight: 'bold'
}
class ResultsPage extends Component {
  render(){
  return (
    <div>
        <AppBar
            title="Results"
            iconElementRight={<FlatButton label = "Profile"/>}
        />
        <h3 style={mainTitleStyle} >Click for more information!</h3>
        <h3 style={subtitleStyle} >Your Date</h3>
      <ResultsItem/>
        <h3 style={subtitleStyle} >Event To Do Together</h3>
      <ResultsItem/>
        <h3 style={subtitleStyle} >Where To Eat After</h3>
      <ResultsItem/>
    </div>
  )
  }
}

export default ResultsPage;