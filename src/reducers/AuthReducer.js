import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_START
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false
};

/**
* We're using the reducer to store the current value of user input.
* Reducer returns application's state.
* Reducers's default state is set to the initial state.
* When an action is dispatched, it is caught by the reducer.
* The string passed in the Action's type property and switch case of the reducer should match
*
* When an Action is dispatched, the reducer is passed last piece of state it had
* published and it produces new state.
* After compares new state with new state, if no data has changed if state/data has changed
* In JavaScript === (equal) check if two pointsra re looking ath the same meory
* For redux to understand that you changed the app state,
* If we want to update our app state, we can't modify existing object. We MUST
*/

export default (state = INITIAL_STATE, action) => {
  console.log('...Reducer AuthReducer  called...');
  switch (action.type) {

    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
      // make a new object, take all properties of the existing state object and throw them
      // into the new object, add 'email' as a new property and assign it a value
      // if the state object already has 'email' property, override it
      // We created a NEW object and return it, because we created and returned new object
      // react will consider as a change in app state
      // every single key press when user types email calls this reducer
      // REDUX RULE: When you return a value from reducer, you gotta create a brand new object
      // otherwise redux things its the old state


      case PASSWORD_CHANGED:
        console.log('...Inside AuthReducer  password change action...');
        return { ...state, password: action.payload };

      case LOGIN_USER_SUCCESS:
        return { ...state,
          user: action.payload,
          error: '',
          loading: false,
          email: '',
          password: '' };
        // whenever we sucessfully login, we return a new state with user model
        // take all existing properties and add a new property called 'user'

      case LOGIN_USER_FAIL:
        return { ...state, error: 'Auhentication Failed.', password: '', loading: false };

      case LOGIN_USER_START:
       return { ...state, loading: true, error: '' };

    default:
      return state;
  }
};
