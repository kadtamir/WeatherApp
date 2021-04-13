import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useTheme } from '@material-ui/core/styles';
import { LocationProvider } from './context/LocationContext';
import { ForecastProvider } from './context/ForecastContext';

import Home from './components/Home';
import About from './components/About';

function App() {
  const theme = useTheme();
  return (
    <LocationProvider>
      <ForecastProvider>
        <CssBaseline />
        <Switch>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/about" render={() => <About />} />
        </Switch>
      </ForecastProvider>
      <div style={{ height: theme.spacing(3) }}></div>
    </LocationProvider>
  );
}

export default App;
