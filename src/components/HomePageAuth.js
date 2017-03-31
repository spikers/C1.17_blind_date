import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {authenticate, setFBToken, getProfile} from './actions'

export default function(ComposedComponent){
  class HomeRedirect extends Component {
    static contextTypes =  {
        router: PropTypes.object
      }
    componentWillMount(){
      if (this.props.router.location.query.fbtoken){
        this.props.setFBToken(this.props.router.location.query.fbtoken)
        this.props.authenticate(true)        
      }else if(localStorage.getItem('token')){
        this.props.setFBToken(localStorage.getItem('token'))
        this.props.authenticate(true)
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
      token: state.token,
      user: state.user.user
    }
  }
  return connect(mapStateToProps, {authenticate, setFBToken, getProfile})(HomeRedirect);
}
