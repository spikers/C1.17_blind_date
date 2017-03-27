import React, {Component} from 'react';
import LogoGray from './LogoGray';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const container = {
    width: '100%',
    marginLeft: '15%'
}
const style = {
    margin: 12,
}
const button = {
    marginLeft: '3%'
}

class ContactUs extends Component {
    render(){
        return(
            <div>
                <AppBar
                    title="Contact Us"
                />
                <LogoGray/>
                <form style={container}>
                    <TextField
                        floatingLabelText="Name"
                    />
                    <TextField
                        floatingLabelText="Email"
                    />
                    <TextField
                        floatingLabelText="Message"
                        multiLine={true}
                        rows={5}
                    /><br />
                    <div style={button}>
                        <RaisedButton label="Reset"
                                      style={style}
                        />
                        <RaisedButton label="Submit"
                                      primary={true}
                                      style={style}
                        />
                    </div>
                </form>
            </div>
        )
    }
}
export default ContactUs;