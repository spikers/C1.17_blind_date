import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router';

export default class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    render() {
        return (
                <div>
                    <AppBar
                        onLeftIconButtonTouchTap={this.handleToggle}
                    />
                    <Drawer
                        containerStyle={{height: '50%', top: '8.5%'}}
                        docked={true}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})
                        }
                    >
                        <Link to='/'><MenuItem onTouchTap={this.handleClose}>Login</MenuItem></Link>
                        <Link to='/profile'><MenuItem onTouchTap={this.handleClose}>Profile</MenuItem></Link>
                        <Link to='/events'><MenuItem onTouchTap={this.handleClose}>Events</MenuItem></Link>
                        <Link to='/results'><MenuItem onTouchTap={this.handleClose}>Results</MenuItem></Link>
                        <Link to='/aboutus'><MenuItem onTouchTap={this.handleClose}>About Us</MenuItem></Link>
                        <Link to='/faq'><MenuItem onTouchTap={this.handleClose}>FAQ</MenuItem></Link>
                        <Link to='/contactus'><MenuItem onTouchTap={this.handleClose}>Contact Us</MenuItem></Link>
                    </Drawer>
                </div>
        );
    }
}