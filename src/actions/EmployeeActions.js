import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { EMPLOYEE_UPDATE } from './types';

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
* We don't need to return an action because we're only intereted in pushing an object
*/
export const employeeCreate = ({ name, phone, shift }) => {
  console.log(name, phone, shift);
  const { currentUser } = firebase.auth();

console.log(`firebase user is ${currentUser.uid}`);

return () => {
  firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
    .then(() => Actions.pop());
  };
};
