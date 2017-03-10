import React from 'react'
import styles from './styles/resultsinfo.css'
const ResultsInfo = (props) => {
  let infoClass = props.clicked ? '' : styles.hide;
  return (
    <div className={styles.content + ' ' + infoClass}> Hey Guys </div>
  )
}

export default ResultsInfo;