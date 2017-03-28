import React from 'react';
import styles from './styles/ResultsImage.css';

const ResultsImage = (props)=> {
  let spin = '';
  if (props.clicked){
     spin = styles.spin
  }
  return(
    <div className={styles.container} onClick={props.showResultsInfo}>
      <div className={`${styles.coin} ${spin}`}>
        <div className={`${styles.face} ${styles.heads}`}>
          Wynk
        </div>
        <div className={`${styles.face} ${styles.tails}`}>
          <img style={{width: "100%", height: "auto"}}src={props. content ? props.content.image : 'https://images-na.ssl-images-amazon.com/images/I/81wpQlT3T5L._AC_UL320_SR278,320_.jpg'} alt="tim"/>
        </div>
      </div>
    </div>
  )
}
export default ResultsImage;