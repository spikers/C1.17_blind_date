import React,{Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {authenticate} from './actions'

export default function(ComposedComponent){
  class Auth extends Component {
    static contextTypes =  {
        router: PropTypes.object
      }
    componentWillMount(){
    //   console.log('this was touched')
    // if (this.props.user && this.props.user.user.fbToken){
    //   console.log('we should be authenticating to true here')
    //   this.props.authenticate(true)
    // }
    if(!this.props.authenticated){
      this.context.router.push('/');
      }
    }
    componentWillUpdate(nextProps){
      // console.log('nextProps in componentWillUpdate', nextProps)
      // if (nextProps.user.user && nextProps.user.user.fbToken){
      //   this.props.authenticate(true)
      // }
      if(!nextProps.authenticated){
        this.context.router.push('/')
      }
    }
    render(){
      return(
        <ComposedComponent {...this.props}/>
      )
    }
  }
  function mapStateToProps(state){
    return {authenticated: state.authenticated}
  }
  return connect(mapStateToProps, authenticate)(Auth);
}
