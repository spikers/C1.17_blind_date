import React, {Component} from 'react';
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
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Person from 'material-ui/svg-icons/action/accessibility';

const buttonStyle = {
    margin: 10,
    marginLeft: 'initial'
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
      case 'number':
        return(
          <TextField type="number" style={inputStyle} hintText={label} floatingLabelText={label} value={this.props.user? this.props.user.age : ''}/>
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
            genderDefault= (this.props.user && this.props.user.looking_for.gender) || null;
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
                {...input} defaultSelected={this.props.user && this.props.user.looking_for.pet}
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
                {...input} defaultSelected={this.props.user &&this.props.user.looking_for.pet}
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
        }
      case "dropdown":
        return (
            <DropDownMenu value={this.state.value} iconButton={<Person/>}>
              <MenuItem value={1} primaryText='Dog' />
              <MenuItem value={2} primaryText="Cat" />
              <MenuItem value={3} primaryText="Fish" />
              <MenuItem value={4} primaryText="Bird" />
            </DropDownMenu>
        );
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
  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  handleChange = (event, index, value) => this.setState({value});

  onSubmit(formProp){
    this.props.updateProfile(this.props.user.fbToken, formProp);
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
                <FloatingActionButton style={{
                  position:"absolute",
                  bottom:"45%",
                  right:"25%"
                }}>
                    <ContentAdd />
                </FloatingActionButton>
              </Paper>
            </Paper>
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
              <Paper style={containerStyle} zDepth={1}>
                <h2>Tell us about yourself!</h2>
                <Field name='username' component={renderInput.bind(this)} type="text" label="Username"/>
                <Field name='given_name' component={renderInput.bind(this)} type="text" label="First Name"/>
                <Field name='family_name' component={renderInput.bind(this)} type="text" label="Last Name"/>
                <Field name='email' component={renderInput.bind(this)} type="text" label="E-mail"/>
                <Field name='age' component={renderInput.bind(this)} type="number" label="Age"/>
                <Field name='biography' component={renderInput.bind(this)} type="textarea" label="About Me"/>
                <Field name='gender' component={renderInput.bind(this)} type='radio' label="I'm a..."/>
                <Field name='pet' component={renderInput.bind(this)} type="radio" label="I'm definitely a..."/>
              </Paper>
              <Paper style={containerStyle} zDepth={1}>
                <h2>Who are you looking for?</h2>
                <Field name='lookforgender' component={renderInput.bind(this)} type="radio" label="I want a..."/>
                <Field name='lookforpet' component={renderInput.bind(this)} type="radio" label="Who's also a..."/>
              </Paper>
              <Link to='/events'><RaisedButton>Cancel</RaisedButton></Link>
              <RaisedButton 
               style={buttonStyle} label="Update Profile" primary={true}
               type="submit"/>
          </form>
        </div>
      )
    }
}

function validate(values){
    console.log('hey, form values in validate', values);
}

function mapStateToProps(state){
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
})(ProfilePage));