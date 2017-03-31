import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router';
import FlatButton from 'material-ui/FlatButton';

const link = {
    textDecoration: "none"
}

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    goBack = () => window.history.back();

    render() {

        return (
                <div>
                    <AppBar
                        onLeftIconButtonTouchTap={this.handleToggle}
                        title={this.props.title}
                        style={this.props.style}
                        iconElementRight={<FlatButton label="Back" />}
                        onRightIconButtonTouchTap={this.goBack}
                    />
                    <Drawer
                        containerStyle={{height: '100%', top: '8.5%', opacity: '0.8'}}
                        docked={true}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <Link to='/' style={link}><MenuItem onTouchTap={this.handleClose}>Login</MenuItem></Link>
                        <Link to='/profile' style={link}><MenuItem onTouchTap={this.handleClose}>Profile</MenuItem></Link>
                        <Link to='/events' style={link}><MenuItem onTouchTap={this.handleClose}>Events</MenuItem></Link>
                        <Link to='/results' style={link}><MenuItem onTouchTap={this.handleClose}>Results</MenuItem></Link>
                        <Link to='/aboutus' style={link}><MenuItem onTouchTap={this.handleClose}>About Us</MenuItem></Link>
                        <Link to='/faq' style={link}><MenuItem onTouchTap={this.handleClose}>FAQ</MenuItem></Link>
                        <Link to='/contactus' style={link}><MenuItem onTouchTap={this.handleClose}>Contact Us</MenuItem></Link>
                        <Link to='https://wynkworld.wordpress.com/' style={link} target='_blank'><MenuItem onTouchTap={this.handleClose}>Blog</MenuItem></Link>
                    </Drawer>
                </div>
        );
    }
}