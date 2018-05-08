import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
//import LoginForm from './components/LoginForm';
import Router from './Router';

/**
* All redux apps must provide one default reducer.
* Default reducer provides starting state for the app.
* React- layer that produces JSX/content
* Redux- handle decision making
*/

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

class App extends Component {
/**
* LIfecycle method.
*/
  componentWillMount() {
    // Initialize Firebase
  const config = {
    apiKey: 'AIzaSyCr6di0eqz6f8EvxO0CJiI9XOj03tbFkvQ',
    authDomain: 'manager-8d17f.firebaseapp.com',
    databaseURL: 'https://manager-8d17f.firebaseio.com',
    projectId: 'manager-8d17f',
    storageBucket: 'manager-8d17f.appspot.com',
    messagingSenderId: '240987691987'
  };

  firebase.initializeApp(config);
  }

  render() {
    //const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    // 2nd arg- any app state that we might wanna pass
    // 3rd arg- store enhancer, it adds additional functionality

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
