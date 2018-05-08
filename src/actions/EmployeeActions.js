import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS
} from './types';

/**
* One action creator for the employee form.
*
*/
export const employeeUpdate = ({ prop, value }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, value }
  };
};

/**
* Get reference to firebase path.
* We don't need to return or dispath an action from this Action Creators
* because we're only intereted in pushing an object to Firebase
* We will NOT use the dispatch method
* when save was sucessful, we navigate the user back to the employee list
* Use Actions.pop() to return to the previous scene
* After sucessfully saving in Firebase, dispatch an action to clear/reset the form
* and navigate to the employee list
*/
export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
        Actions.pop();
      });
    };
};

/**
* This Action creator is used to fetch a list of employees from Firebase
* and then dispatch an action.
* This is an async action to interact with Firebase. So, we need to use Redux Thunk.
*
* In order to fetch data from Firebase, you need to chain on "on" callback
* You are basically listening for any data change on the Firebase reference
* Whenever we get new dta, we dispatch an action
*/
export const employeesFetch = () => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
      .on('value', snapshot => {
        dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

/**
* Update an existing record.
* uid- primary key of the Emplyee record that we want to update.
* This is an async action creator.
* Point to a specific record and update it.
*
* EMPLOYEE_SAVE_SUCESS- reset the form
*/
export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
        Actions.employeeList({ type: 'reset' });
      });
  };
};
