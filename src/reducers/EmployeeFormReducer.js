import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS
 } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  phone: '',
  shift: ''
};

/**
* This reducer maintains all three properties (name, phone, shift) of Employee state
*
*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
    //action.payload === { rop: 'name', value: 'jane', ...}
    return { ...state, [action.payload.prop]: action.payload.value };
    /**
    * Above is ES-6 feature called Key Interpolation
    * The keys we're adding to the object will be determined at runtime
    */

    case EMPLOYEE_CREATE:
      return INITIAL_STATE;
    /**
    * Dispatch of this action means that the employee was sucessfully saved into firebase
    * reset the form
    */

    case EMPLOYEE_SAVE_SUCCESS:
          return INITIAL_STATE;

    default:
      return state;
  }
};
