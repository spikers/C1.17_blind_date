import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import axios from 'axios';
import styles from './styles/LoginPage.css';
import TextField from 'material-ui/TextField';
import Logo from './Logo';
import {white} from 'material-ui/styles/colors';

const inputStyle = {
    color: white
};

const sendLogin = function(){
  const instance = axios.create({
    headers:{
    'Content-Type' : 'application/x-www-form-urlencoded'
  }
})
  const request = instance.get('http://54.202.15.233:8000/api/user', '136173360242729').then(console.log('promise', request))
  console.log(request)
}

class LoginPage extends Component {
    render(){
        let path = '/profile';
        //create some function to detect session to swap path between profile and events on Submit
        return(
            <div>
              <div className={styles.container}>
                  <Logo classNameName="LogoStyles.logo"/>
                  <form>
                      <TextField
                      floatingLabelText="Email"
                      hintText="Email"
                      inputStyle = {inputStyle}
                       /><br/>
                      <TextField
                      floatingLabelText="Password" 
                      type="password"
                      hintText="Password"
                      inputStyle = {inputStyle}
                      />
                  </form>
                  <Link to={path} onClick={sendLogin}><img src={require('./img/fb_login.png')}/></Link>
              </div>
            </div>
        )
    }
  }

export default LoginPage;