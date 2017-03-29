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

class LoginPage extends Component {
    static contextTypes =  {
        router: PropTypes.object
      }
    componentWillMount(){
        console.log(this.props)
        if(this.props.authenticated){
            this.props.getProfile(this.props.token).then(()=>{
                this.context.router.push('/profile')
            })
        }
    }
    render(){
        console.log('this.props in render', this.props)
        return(
        <div>
            <div className={styles.container}>
            <Logo classNameName="LogoStyles.logo"/>
            <div style={{width:"60vw", height: "auto"}}>
                <img style={{width:"100%", height: "auto"}} src={require('./img/fb_login.png')}/>
            </div>
            <a href="http://localhost:8000/auth/facebook">Test Auth</a>
            </div>
        </div>
        )
    }
  }

  function mapStateToProps(state){
      console.log('state in login page', state)
      return({
      authenticated: state.authenticated,
      user: state.user.user,
      token: state.user.token
      })
  }

export default connect(mapStateToProps, {authenticate, getProfile})(LoginPage);

