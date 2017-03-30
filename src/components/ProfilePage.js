import React, {Component, PropTypes} from 'react';
import {Field, reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {getProfile, updateProfile} from './actions/index';
import {Link} from 'react-router';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import Person from 'material-ui/svg-icons/action/accessibility';

const buttonStyle = {
    margin: "2%"
}

const containerStyle = {
    margin: 10,
    padding: 20,
    position: 'relative',
}

const picStyle = {
  height:250,
  width:250,
  textAlign: 'center',
  display: 'block',
  margin: 'auto',
}

const fabStyle={
    margin: 'auto',
    position: 'absolute',
    left: "60%",
    bottom: "3%",
}

const inputStyle={
    marginTop: 10,
    marginBottom: 10
}

const createInput = function(input, label, type){

  // console.log('this.props in createInput', this.props.user)
    switch (type){
      case 'textarea':
        return(
          <TextField
          {...input}
          hintText={label}
          multiLine={true}
          fullWidth={true}
          />
        )
      case 'radio':
        let genderDefault = null;
        switch (label){
          case "I'm a...":
            genderDefault= this.props.user ? this.props.user.gender : null;
            return (
              <div>
              <p>{label}</p>
              <RadioButtonGroup 
              {...input} defaultSelected={genderDefault}
              >
                    <RadioButton
                      value="male"
                      label="Guy"
                    />
                    <RadioButton
                      value="female"
                      label="Girl"
                    />
              </RadioButtonGroup>      
            </div>)
          case "I want a...":
            genderDefault= (this.props.user && this.props.user.looking_for && this.props.user.looking_for.gender) || null;
            return (
                <div>
                <p>{label}</p>
                <RadioButtonGroup 
                {...input} defaultSelected={genderDefault}
                >
                      <RadioButton
                        value="male"
                        label="Guy"
                      />
                      <RadioButton
                        value="female"
                        label="Girl"
                      />
                </RadioButtonGroup>      
              </div>)
          case "I'm definitely a...":
            return (
                <div>
                <p>{label}</p>
                <RadioButtonGroup 
                {...input} defaultSelected={this.props.user && this.props.user.looking_for && this.props.user.looking_for.pet || null}
                >
                      <RadioButton
                        value="dog"
                        label="Dog Person"
                      />
                      <RadioButton
                        value="cat"
                        label="Cat Person"
                      />
                      <RadioButton
                        value="fish"
                        label="Fish Person"
                      />
                      <RadioButton
                        value="bird"
                        label="Bird Person"
                      />
                </RadioButtonGroup>      
              </div>)
          case "Who's also a...":
            return (
                <div>
                <p>{label}</p>
                <RadioButtonGroup 
                {...input} defaultSelected={(this.props.user && this.props.user.looking_for && this.props.user.looking_for.pet) || null}
                >
                      <RadioButton
                        value="dog"
                        label="Dog Person"
                      />
                      <RadioButton
                        value="cat"
                        label="Cat Person"
                      />
                      <RadioButton
                        value="fish"
                        label="Fish Person"
                      />
                      <RadioButton
                        value="bird"
                        label="Bird Person"
                      />
                </RadioButtonGroup>      
              </div>)
          case "I can't eat...": 
          // let defaultDiet = "none"
          // if (this.props.user && this.props.user.dietary_restrictions){
          //   let arr = JSON.parse(this.props.user.dietary_restrictions[0])
          //   defaultDiet = arr[0]
          // }
          console.log('diet restrictions', this.props.user && this.props.user.dietary_restrictions[0])
            return(
              <div>
                <p>{label}</p>
                  <RadioButtonGroup {...input} defaultSelected={this.props.user && this.props.user.dietary_restrictions[0]}>
                      <RadioButton
                        value="vegetarian"
                        label="Meat"
                      />
                      <RadioButton
                        value="vegan"
                        label="Any Animal Products"
                      />
                      <RadioButton
                        value="none"
                        label="...actually I can eat anything!"
                      />   
                </RadioButtonGroup>      
              </div>
              )}
      default:
        return(
          <TextField
          {...input}
          fullWidth= {true}
          hintText={label}
          floatingLabelText={label}/>)
    }
  }

 const renderInput = function({input, label, type}){
    return(
      <div>{createInput.bind(this)(input, label, type)}</div>
    )
  }

class ProfilePage extends Component{
  static contextTypes =  {
        router: PropTypes.object
      }
  // constructor(props) {
  //   super(props);
  //   this.state = {value: 1};
  // }

  // handleChange = (event, index, value) => this.setState({value});

  onSubmit(formProp){
    console.log('these are formProp', formProp)
    let forms = formProp
    forms.dietary_restrictions[0]= forms.diet || forms.dietary_restrictions[0]
  forms.looking_for = {
    gender: forms.lookforgender,
    pet: forms.lookforpet
  }
  delete forms.pet
  delete forms.lookforgender
  delete forms.lookforpet
  delete forms.diet
  console.log('this is forms after changes', forms)
    this.props.updateProfile(this.props.user.fbToken, forms);
    this.context.router.push('/events');
  }

    render(){
      console.log('props in profile page', this.props);
      const {handleSubmit} = this.props;
      return (
        <div> 
          <Paper style={containerStyle} zDepth={1}>
            <h3>What's up, {this.props.user !== null ? this.props.user.username: 'User'}?</h3>
              <Paper style={picStyle}circle={true} zDepth={2}>
                <div style={{
                  width:'100%', 
                  height:'auto',
                  overflow: 'hidden',
                  borderRadius: "50%"}}>
                <img style={{
                  width:'100%', 
                  height:'auto'}}
                  src={(this.props.user && this.props.user.profile_picture) || require('./img/flip_person.png')}/>
                </div>
              </Paper>
              <FloatingActionButton style={{
                  position:"absolute",
                  bottom:"2%",
                  right:"2%"
                }}>
                    <ContentAdd />
                </FloatingActionButton>
            </Paper>
            <form>
              <Paper style={containerStyle} zDepth={1}>
                <h2>Tell us about yourself!</h2>
                <Field name='username' component={renderInput.bind(this)} type="text" label="Username"/>
                <Field name='given_name' component={renderInput.bind(this)} type="text" label="First Name"/>
                <Field name='family_name' component={renderInput.bind(this)} type="text" label="Last Name"/>
                <Field name='email' component={renderInput.bind(this)} type="text" label="E-mail"/>
                <Field name='age' component={renderInput.bind(this)} type="text" label="Age"/>
                <Field name='biography' component={renderInput.bind(this)} type="textarea" label="About Me"/>
                <Field name='gender' component={renderInput.bind(this)} type='radio' label="I'm a..."/>
                <Field name='pet' component={renderInput.bind(this)} type="radio" label="I'm definitely a..."/>
                <Field name='diet' component={renderInput.bind(this)} type="radio" label="I can't eat..."/>
              </Paper>
              <Paper style={containerStyle} zDepth={1}>
                <h2>Who are you looking for?</h2>
                <Field name='lookforgender' component={renderInput.bind(this)} type="radio" label="I want a..."/>
                <Field name='lookforpet' component={renderInput.bind(this)} type="radio" label="Who's also a..."/>
              </Paper>
              <div style={{textAlign: "right"}}>
                <Link style={buttonStyle} to='/events'><RaisedButton >Cancel</RaisedButton></Link>
                <RaisedButton 
                style={buttonStyle} label="Update Profile" primary={true}
                type="submit"
                onClick={handleSubmit(this.onSubmit.bind(this))}
                />
               </div>
          </form>
        </div>
      )
    }
}

function validate(values){
}

function mapStateToProps(state){
  console.log('state in profile', state)
  return {
    user: state.user.user,
    initialValues: state.user.user,
    authenticated: state.authenticated,
    token: state.user.token
  }
}

export default connect(mapStateToProps, {getProfile, updateProfile})(reduxForm({
    form: 'Profile',
    validate
})(ProfilePage))