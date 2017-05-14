import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import GomokuApp from './js/GomokuApp';

injectTapEventPlugin();

const App = () => (
  <MuiThemeProvider>
    <GomokuApp />
  </MuiThemeProvider>
);

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);
