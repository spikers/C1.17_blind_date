import React, {Component} from 'react';
import {Link} from 'react-router';
import ResultsItem from './resultsitem';

class ResultsPage extends Component {
  render(){
  return (
    <div>
      <h1>Results</h1>
      <Link to="/profile">Profile</Link>
      <ResultsItem/>
      <ResultsItem/>
      <ResultsItem/>
    </div>
  )
  }
}

export default ResultsPage;