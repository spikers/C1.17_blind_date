import React from 'react';
import ResultsImage from './resultsimage';
import ResultsInfo from './resultsinfo';

const ResultsItem = ()=>{
  return (
    <div>
      <ResultsImage className="ResultsImageStyles.resultsimage"/>
      <ResultsInfo/>
    </div>
  )
}
export default ResultsItem;