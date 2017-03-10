import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './styles/Background.css';
import input_style from './styles/Input.css';
import LogoLogin from './LogoLogin';

class LoginPage extends Component {
    render(){
        let path = '/profile';
        //create some function to detect session to swap path between profile and events on Submit
        return(
              <div className="container">
                  <LogoLogin/>
                  <div className={input_style.input_div}>
                      <input className={input_style.input} type="text" placeholder="   Email"/>
                      <input className={input_style.input} type="text" placeholder="   Password"/>
                  </div>
                  <Link to={path}><img className={input_style.fb} src={require('./img/fb_login.png')}/></Link>
              </div>
        )
    }
  }
export default LoginPage;