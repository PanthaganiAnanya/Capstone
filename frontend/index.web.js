import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AppRegistry } from 'react-native';

// Register the app component
AppRegistry.registerComponent('App', () => App);

AppRegistry.runApplication('App', {
  initialProps: {},
  rootTag: document.getElementById('app-root'),
});

// Create a div element that will host the app
const rootElement = document.createElement('div');
rootElement.id = 'app-root';
document.body.appendChild(rootElement);

// Render the App component into the root element
ReactDOM.render(<App />, rootElement);
