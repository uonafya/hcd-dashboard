import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from '@material-ui/styles';
import validate from 'validate.js';

import theme from './theme';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import 'assets/css/custom.css';
import validators from './common/validators';
import Routes from './Routes';

const browserHistory = createBrowserHistory();

validate.validators = {
  ...validate.validators,
  ...validators
};

console.log('ENV = '+process.env.REACT_APP_ENV);
export default class App extends Component {
  render() {
    return (
          <ThemeProvider theme={theme}>
            <HashRouter history={browserHistory}>
              <Routes />
            </HashRouter>
          </ThemeProvider>
    );
  }
}
