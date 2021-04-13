import React from 'react';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import { useLocation } from '../context/LocationContext';
import { useForecast } from '../context/ForecastContext';

import Navbar from './Navbar';
import MainForecast from './MainForecast';
import Detailed from './Detailed';
import Hourly from './Hourly';
import Daily from './Daily';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

function Home() {
  const classes = useStyles();
  const [location] = useLocation();
  const [forecast, setForecast] = useForecast();
  React.useEffect(() => {
    setForecast(location.lat, location.lon);
  }, [setForecast, location]);
  const { current, daily, hourly } = forecast;

  return (
    <React.Fragment>
      <Navbar />
      {!forecast.lat ? (
        <Backdrop open={!forecast.current.lat} className={classes.backdrop}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Container maxWidth="lg">
          <MainForecast
            forecast={{
              current,
              day: daily[0].temp,
            }}
            location={location}
          />
          <Daily forecast={daily} />
          <Hourly forecast={hourly} />
          <Detailed forecast={current} />
        </Container>
      )}
    </React.Fragment>
  );
}

export default Home;
