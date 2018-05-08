import React, { Component } from 'react';
import { connect } from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

/**
* What happens when the user hits the "create" button?
* Call an Action Creator, save record and navigate back to employee list screen
*
*/

class EmployeeCreate extends Component {

/**
* Create an action creator
*/
  onButtonPress() {
      const { name, phone, shift } = this.props;
      this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  render() {
    console.log(this.props.employee);

    return (
      <Card>
        <EmployeeForm {...this.props} />
        /**
        * Pass all props to Emplyee form.
        * take all props that employeeCreate has and pass to employee EmployeeForm
        */

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

/**
* why is it called state.employeeForm?
* check the combinereducers call
*/
const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;

  return { name, phone, shift };
};

export default connect(mapStateToProps, { employeeUpdate, employeeCreate })(EmployeeCreate);
