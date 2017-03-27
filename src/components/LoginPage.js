import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import axios from 'axios';
import styles from './styles/LoginPage.css';
import TextField from 'material-ui/TextField';
import Logo from './Logo';
import {white} from 'material-ui/styles/colors';
import {authenticate, getProfile} from './actions'

const inputStyle = {
    color: white
};

const sendLogin = function(){
  this.props.getProfile(136173360242729).then(
    (res)=>{
        console.log('success function called', res)
        this.props.authenticate(true)
        console.log('props after callback', this.props)
        this.context.router.push('/profile')
    }
  )
}

class LoginPage extends Component {
    static contextTypes =  {
        router: PropTypes.object
      }
    componentWillMount(nextProps){
        console.log('nextProps.location', nextProps)
    }
    render(){
        let path = '/profile';
        //create some function to detect session to swap path between profile and events on Submit
        return(
        <div>
            <div className={styles.container}>
            <Logo classNameName="LogoStyles.logo"/>
            <a href="/auth/facebook">Test Auth</a>
            <div style={{width:"60vw", height: "auto"}} onClick={sendLogin.bind(this)}>
                <img src={require('./img/fb_login.png')}/>
            </div>

            </div>
        </div>
        )
    }
  }

  function mapStateToProps(state){
      console.log('state in login page', state)
      return({
      authenticated: state.authenticated,
      user: state.user.user
      })
  }

export default connect(mapStateToProps, {authenticate, getProfile})(LoginPage);

