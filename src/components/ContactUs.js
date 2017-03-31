import React, {Component} from 'react';
import LogoGray from './LogoGray';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const style = {
    margin: 12,
}
const div = {
    width: "65%",
    margin: "auto"
}
const button = {
    width: "65%",
    margin: "auto"
}

class ContactUs extends Component {
    render(){
        return(
            <div>
                <LogoGray/>
                <div style={div}>
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
                    <RaisedButton label="Reset"
                                  style={style}
                    />
                    <RaisedButton label="Submit"
                                  primary={true}
                                  style={style}
                    />
                </div>
            </div>
        )
    }
}
export default ContactUs;