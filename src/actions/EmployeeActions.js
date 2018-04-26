import firebase from 'firebase';
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
*/
export const employeeCreate = ({ name, phone, shift }) => {
  console.log(name, phone, shift);
  const { currentUser } = firebase.auth();

console.log(`firebase user is ${currentUser.uid}`);

  firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
    .then(() => {
      console.log('Save to Firebase was successful');
    })
    .catch((error) => {
      console.log('firebas error');
    console.log(error);
  });
};
