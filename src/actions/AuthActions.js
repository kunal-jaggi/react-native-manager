/**
* An Action is a plain JS object with a 'type' property.
*
*---------------------------------------------
***** Rules for Default Action Creators ******
*---------------------------------------------
* Action creators are functions
* Must return an action
* An Action is a JS object with a type property and optinally a payload property
*
*--------------------------------------------------
***** Rules for Action Creators with Thunk ******
*--------------------------------------------------
* Action creators are functions
* Must return an function
* This function can be called with a dispatch
*f
* What does Redux Thunk allow us to do?
* It allows to return a function from an Action cretor.
*/
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_START
} from './types';

export const emailChanged = (text) => {
  console.log('Action creator emailChnaged called');
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

/**
* We need to return an Async Action Creator
* Redux Thunk can be used for any async or long running Action Creators
* Redux Thunk is an npm module (npm install --save redux-thunk)
* It allows us to bend the rules of a sync Action Creators by returning a function
* and we can manually dispatch action to all of our reducers
* Redux Think is called MIDDLEWARE
* The below code dispatches an action aftr login (an async action) is complete
* Thunk gives you the ability to dispatch many actions
*
* This function is used to authenticate a user with email and password.
* If auth fails, we then try to create the new user into Firebase auth.
* If user creation fails, we dispatch an action.
*
* What is our strategy to dispatch actions in this function?
* 1. When the user taps on the 'Login' button, we immediately dispatch
* LOGIN_USER_START action to show spinner
* 2. When Firebase auth is succesful, we dispatch LOGIN_USER_SUCCESS action
* 3. When Firebse auth fails, we dispatch LOGIN_USER_FAIL action
*/

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
  //immediately dispatch an action to show a spinner
  dispatch({ type: LOGIN_USER_START });

 firebase.auth().signInWithEmailAndPassword(email, password)
  .then(user => loginUserSuccess(dispatch, user))
  .catch((error) => {
      console.log(error);
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(user => loginUserSuccess(dispatch, user))
        .catch(() => loginUserFail(dispatch));
  });
 };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

/**
* After sucessful login, navigate the user to he employees scene
* How to navigate users around in the app?
* Step 1: import Actions from the react-native-router-flux library
* Step 2: Call Actions.<scene_key>
*/

const loginUserSuccess = (dispatch, user) => {
  console.log('Login was sucessful');
  console.log(user);
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  //navigate the user
  Actions.main();
};
