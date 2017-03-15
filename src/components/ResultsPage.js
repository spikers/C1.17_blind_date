import React, {Component} from 'react';
import {Link} from 'react-router';
import ResultsItem from './ResultsItem';
import Logo from './Logo'

class ResultsPage extends Component {
  render(){
  return (
    <div>
      <Logo/>
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