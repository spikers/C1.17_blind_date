import React from 'react';
import Header from './Header';

export default (props)=>{
    let titleName = {};
    switch(props.router.location.pathname){
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
            {props.children}
        </div>
    )}