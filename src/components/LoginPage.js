import React, {Component} from 'react';
import {Link} from 'react-router';
import styles from './styles/LoginPage.css';
import TextField from 'material-ui/TextField';
import Logo from './Logo';
import {white} from 'material-ui/styles/colors';

const inputStyle = {
    color: white
};

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
                    <Link to={path}><img src={require('./img/fb_login.png')}/></Link>
                </div>
            </div>
        )
    }
}
export default LoginPage;