import React from 'react';
import styles from './styles/resultsimage.css';

const ResultsImage = (props)=> {
  return(
    <div className={styles.container} onClick={props.showResultsInfo}>
      <img className={styles.spinning + ' ' + styles.circle}src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/5/005/095/0d0/0796c17.jpg" alt="tim"/>
    </div>
  )
}
export default ResultsImage;