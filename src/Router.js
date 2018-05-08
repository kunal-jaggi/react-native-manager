/**
* Router.js
* We are going to define all routes that the user can visit
* How do you wire a Router in your app?
*
*/

import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';
import EmployeeEdit from './components/EmployeeEdit';

/**
* Root scene- this is the parent scene
* A scene has the below props:
* 1.
*/
const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar>
        <Scene key="auth">
          <Scene key="login" component={LoginForm} title="Please Login" />
        </Scene>
      <Scene key="main">
        <Scene
          rightTitle="Add"
          onRight={() => { Actions.employeeCreate(); }}
          key="employeeList"
          component={EmployeeList}
          title="Employees"
          initial
        />
        <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
        <Scene key="employeeEdit" component={EmployeeEdit} title="Edit Employee" />
      </Scene>
    </Scene>
    </Router>
  );
};

export default RouterComponent;
