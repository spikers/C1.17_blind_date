import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './styles/Background.css';
import input_style from './styles/Input.css';
import Logo from './logo';

class LoginPage extends Component {
    render(){
        let path = '/profile';
        //create some function to detect session to swap path between profile and events on Submit
        return(
              <div className="container">
                  <Logo classNameName="LogoStyles.logo"/>
                  <form className="form-inline">
                      <div className={ " input-group mb-2 mr-sm-2 mb-sm-0" + input_style.input }>
                          <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="E-mail or Phone"/>
                      </div>
                      <div className="input-group mb-2 mr-sm-2 mb-sm-0">
                          <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Password"/>
                      </div>
                  </form>
                  <Link to={path}><img className={input_style.fb} src={require('./img/fb_login.png')}/></Link>
              </div>
        )
    }
  }
export default LoginPage;