import React, {Component} from 'react';
import LogoGray from './LogoGray';
import {Link} from 'react-router';

const headers = {
    width: "80%",
    margin: "5% auto",
    textAlign: 'center'
}

class NotFound extends Component {
    render(){
        return(
            <div>
                <LogoGray/>
                <h2 style={headers}>Page is Not Found</h2>
                <h3 style={headers}>Click <Link to='/'>Here</Link> to visit Wynk</h3>
            </div>
        )
    }
}
export default NotFound;