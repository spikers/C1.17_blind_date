import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {authenticate, setFBToken, getProfile} from './actions'

export default function(ComposedComponent){
  class Auth extends Component {
    static contextTypes =  {
        router: PropTypes.object
      }
    componentWillMount(){
      if(!this.props.authenticated && !localStorage.getItem('token')){
        this.context.router.push('/');
        }
      else if(localStorage.getItem('token') && !this.props.authenticated){
        this.props.authenticate(true)
        this.props.setFBToken(localStorage.getItem('token'))
      }
      console.log('props in requireAuth', this.props)
      if(!this.props.user){
        this.props.getProfile(localStorage.getItem('token'))
      }
    }
    componentWillUpdate(nextProps){
      if(!this.props.authenticated && !localStorage.getItem('token')){
        this.context.router.push('/');
        }
      else if(localStorage.getItem('token') && !this.props.authenticated){
        this.props.authenticate(true)
        this.props.setFBToken(localStorage.getItem('token'))
      }
      console.log('props in requireAuth', this.props)
      if(!this.props.user && this.props.authenticated){
        this.props.getProfile(localStorage.getItem('token'))
      }
    }
    render(){
      return(
        <ComposedComponent {...this.props}/>
      )
    }
  }
  function mapStateToProps(state){
    return {
      authenticated: state.authenticated,
      token: state.user.token,
      user: state.user.user
    }
  }
  return connect(mapStateToProps, {authenticate,setFBToken, getProfile})(Auth);
}
