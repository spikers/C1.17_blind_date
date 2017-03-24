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
    let clicked = !this.state.clicked;
    this.setState({clicked:clicked});
  }

  render(){
    return (
      <div style={{display:"flex", justifyContent:"center", flexDirection: "column", alignItems: "center"}}>
        <ResultsImage content={this.props.content} clicked={this.state.clicked} showResultsInfo={()=>this.showResultsInfo()}/>
        <ResultsInfo content={this.props.content} clicked={this.state.clicked}/>
      </div>
   )
  }
}
export default ResultsItem;