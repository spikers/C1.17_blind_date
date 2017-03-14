import React from 'react';
import styles from './styles/Logo.css';

const Logo = ()=> {
    return(
            <img className={styles.logo} src={require('./img/logo3.png')}/>
    )
}
export default Logo;
