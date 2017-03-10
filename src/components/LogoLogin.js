import React from 'react';
import styles from './styles/Logo.css';

const LogoLogin = ()=> {
    return(
        <img className={styles.logo_login} src={require('./img/logo.png')}/>
    )
}
export default LogoLogin;
