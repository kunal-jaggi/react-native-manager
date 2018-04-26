import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

/**
*----------------
*** App Flow ***
*----------------
* 1 User Types something
* 2. Call Action creator
* 3.Action Creator returns an action
* 4. Action is sent to all Reducers
* 5. Reducer produces new app state
* 6. State is sent to all components
* 7. Components rerender with new state
* 8. Textfield gets updated
*/

class LoginForm extends Component {

/**
* Callback to listen for text Input
* Call and Action Creator so that we can update our app level state with
* the new value user has entered
*
*/
onEmailChange(text) {
  this.props.emailChanged(text);
}

/**
* Callback to listen for password change
*/
onPasswordChange(text) {
  this.props.passwordChanged(text);
}

onButtonPress() {
  const { email, password } = this.props;
  this.props.loginUser({ email, password });
}

renderButton() {
  if (this.props.loading) {
    return <Spinner size="large" />;
  }

  return (
  <Button onPress={this.onButtonPress.bind(this)}>
    Login
  </Button>
);
}

renderError() {
  if (this.props.error) {
    return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
    );
  }
}
/**
* Goal: whenever user types something, we wanna update our app state.
*
*/
  render() {
    return (
      <Card>
        <CardSection>
          <Input
          label="Email"
          placeholder="email@gmail.com"
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
          secureTextEntry
          label="Password"
          placeholder="password"
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
          />
        </CardSection>

        {this.renderError()}

        <CardSection>
          {this.renderButton()}
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

/*
* What is mapStateToProps?
* Give some piece of statet to UI Component. It is called with global app state.
* This is used to pull doen properties from the global state object.
*/
const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

/**
* pass action creator to connect
*/
export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
