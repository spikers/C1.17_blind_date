import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {authenticate} from './actions'
class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            authenticated: false
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});

    logout = () => {
        localStorage.removeItem('token')
        this.setState({open:false})
        this.props.authenticate(false)
    }
    
    componentWillMount(){
            if (this.props.authenticated){
                this.setState({authenticated:true})
            }
        }

    render() {
        return (
                <div>
                    <AppBar
                        onLeftIconButtonTouchTap={this.handleToggle}
                        title={this.props.title}
                        style={this.props.style}
                    />
                    <Drawer
                        containerStyle={{height: '100%', top: '8.5%'}}
                        docked={true}
                        width={200}
                        open={this.state.open}
                        onRequestChange={(open) => this.setState({open})}
                    >
                        <Link to='/profile'><MenuItem onTouchTap={this.handleClose}>Profile</MenuItem></Link>
                        <Link to='/events'><MenuItem onTouchTap={this.handleClose}>Events</MenuItem></Link>
                        <Link to='/results'><MenuItem onTouchTap={this.handleClose}>Results</MenuItem></Link>
                        <Link to='/aboutus'><MenuItem onTouchTap={this.handleClose}>About Us</MenuItem></Link>
                        <Link to='/faq'><MenuItem onTouchTap={this.handleClose}>FAQ</MenuItem></Link>
                        <Link to='/contactus'><MenuItem onTouchTap={this.handleClose}>Contact Us</MenuItem></Link>
                        <Link to='/'><MenuItem onTouchTap={this.logout}>{this.props.authenticated ? 'Logout':'Login'}</MenuItem></Link>
                    </Drawer>
                </div>
        );
    }
}

function mapStateToProps(state){
    return {authenticated:state.authenticated}
}

export default connect(mapStateToProps, {authenticate})(Sidebar)