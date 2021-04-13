import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';

const history = createBrowserHistory();

let theme = createMuiTheme({
  palette: {
    common: {
      black: '#333',
    },
    secondary: {
      main: '#fff',
    },
  },
  background: {
    paper: '#8e88d0',
  },
});
// Responsive Typography
theme = responsiveFontSizes(theme, { factor: 5, variants: ['h4', 'body1'] });
theme.typography.body1 = {
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.8rem',
  },
};

ReactDOM.render(
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Router>,
  document.getElementById('root')
);
