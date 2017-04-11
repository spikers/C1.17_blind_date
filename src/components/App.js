import React, {Component} from 'react';
import Header from './Header';
import {connect} from 'react-redux';
import {setGeolocation} from './actions'

class App extends Component { 
    componentDidMount(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                this.setPosition.call(this, position)
            }.bind(this))
        }else{
            this.props.setGeolocation({latitude: 33.683947, longitude: -117.794694})
        }
    }

    setPosition(position){
        let latLong={
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        this.props.setGeolocation(latLong)
    }

    render(){
        let titleName = {};
        switch(this.props.router.location.pathname){
        case '/':
            titleName = 'Login';
            break;
        case '/profile':
            titleName = 'Profile';
            break;
        case '/events':
            titleName = 'Events';
            break;
        case '/results':
            titleName = 'Results';
            break;
        case '/aboutus':
            titleName = 'About Us';
            break;
        case '/faq':
            titleName = 'FAQ';
            break;
        case '/contactus':
            titleName = 'Contact Us';
            break;
    }
    return(
        <div>
            <Header
                title={titleName}
            />
            {this.props.children}
        </div>
    )
    }
}
    
function mapStateToProps(state){
    return {geolocation: state.user.geolocation}
}

export default connect(mapStateToProps,{setGeolocation})(App) ;