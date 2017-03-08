import React from 'react';
import styles from './styles/resultsimage.css';

const ResultsImage = ()=> {
  return(
    <div className={styles.container}>
      <img className={styles.circle} src="http://www.peta2.com/wp-content/uploads/2013/12/cutest-bunny-ever.jpg" alt="bunny"/>
      <div className={styles.red}>Hello</div>
    </div>
  )
}
export default ResultsImage;