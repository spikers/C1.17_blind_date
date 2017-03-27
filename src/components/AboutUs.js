import React, {Component} from 'react';
import LogoGray from './LogoGray';
import Header from './Header';
import styles from './styles/HeaderTitle.css';
const textDiv = {
    width: "90%",
    textAlign: "center",
    margin: "auto"
}
const text = {
    lineHeight: '200%'
}
const bold = {
    lineHeight: '200%',
    fontWeight: 'bold',
    color: 'rgb(194, 24, 91)'
}

class AboutUs extends Component {
    render(){
        return(
            <div>
                <Header/>
                <h1 className={styles.title}>About Us</h1>
                <LogoGray/>
                 <img style={{
                    width:'60%',
                    margin:'0 20%'}}
                     src="https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/5/005/095/0d0/0796c17.jpg"/>
                <div style={textDiv}>
                    <p style={text}>
                        What is the most frustrating part about dating? PLANNING!
                        Different from other dating apps, WYNK lets you choose an activity
                        (movies, outdoor activities, live performances)
                        of your interest, and matches your date according to that activity!
                        Not only that, WYNK also recommends a place to eat that is
                        near the place where the activity occurs. With WYNK, you don't
                        have to worry about planning anymore!
                    </p>
                    <p style={bold}>
                        Welcome to WYNK
                    </p>
                </div>
            </div>
        )
    }
}
export default AboutUs;