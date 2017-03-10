import React, {Component} from 'react';
import {Link} from 'react-router';
import Logo from './Logo';
import style from './styles/profile.css';
import Logo from './logo'

class ProfilePage extends Component {
    render(){
      return (
        <div>
            <Logo/>
            <div className={style.image}></div>
            <div className={style.input_container}>
                <p className={style.label}>User Name</p><input className={style.profile_input} type="text"/>
                <p className={style.label}>Name</p><input className={style.profile_input}  type="text"/>
                <p className={style.label}>Age</p><input className={style.profile_input}  type="text"/>
                <p className={style.label}>Gender</p><input className={style.profile_input}  type="text"/>
                <p className={style.label}>Looking for</p><input className={style.profile_input}  type="text"/>
                <p className={style.label}>E-mail</p><input className={style.profile_input}  type="text"/>
                <p className={style.label}>About Me</p><input className={style.about_me}  type="text"/>
            </div>
          <Link to='/events'><img className={style.submit} src={require('./img/submit.png')}/></Link>
        </div>
      )
    }
  }
export default ProfilePage;