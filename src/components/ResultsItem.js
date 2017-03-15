import React, {Component} from 'react';
import ResultsImage from './ResultsImage';
import ResultsInfo from './ResultsInfo';
import styles from './styles/ResultsItem.css';

class ResultsItem extends Component {
  constructor(){
    super();
    this.state = {
      clicked: false,
    }
  }; 
  
  showResultsInfo(){
    console.log('image was clicked');
    let clicked = !this.state.clicked;
    this.setState({clicked:clicked});
    console.log(this.state.clicked);
  }

  render(){
    return (
      <div>
        <ResultsImage showResultsInfo={()=>this.showResultsInfo()}/>
        <ResultsInfo clicked={this.state.clicked}/>
      </div>
   )
  }
}
export default ResultsItem;