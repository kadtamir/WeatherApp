import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { fade, makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import sunrise from '../images/sunrise.png';
import sunset from '../images/sunset.png';
import wind from '../images/wind.png';
import angle from '../images/angle.png';
import humidity from '../images/humidity.png';
import cloudiness from '../images/cloudiness.png';
import ProgressBar from './ProgressBar';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    backgroundColor: fade(theme.palette.common.white, 0.46),
    borderRadius: theme.shape.borderRadius * 5,
    marginTop: theme.spacing(3),
    padding: theme.spacing(2, 10),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  row: {
    height: '85px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uPadd: {
    padding: theme.spacing(1, 0),
  },
  icon: {
    height: '70px',
    [theme.breakpoints.down('sm')]: {
      height: '40px',
    },
  },
  sunrise: {
    height: '80px',
    marginBottom: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      height: '50px',
    },
  },
  sunset: {
    height: '80px',
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      height: '50px',
      marginLeft: theme.spacing(1),
    },
  },
  velocity: {
    fontSize: '0.5em',
  },
  angle: {
    width: '4ch',
  },
}));

function Detailed({ forecast }) {
  const classes = useStyles();
  const renderSunDetails = () => {
    return (
      <Box className={classes.row}>
        <img src={sunrise} alt={sunrise} className={classes.sunrise} />
        <Typography component="p" variant="h4">
          {moment.unix(forecast.sunrise).format('HH:mm')}
        </Typography>
        <img src={sunset} alt={sunset} className={classes.sunset} />
        <Typography component="p" variant="h4">
          {moment.unix(forecast.sunset).format('HH:mm')}
        </Typography>
      </Box>
    );
  };

  const renderWindDetails = () => {
    return (
      <Box className={classNames(classes.row, classes.uPadd)}>
        <img src={wind} alt={wind} className={classes.icon} />
        <Typography component="p" variant="h4">
          {(3.6 * forecast.wind_speed).toFixed(2)}
          <span className={classes.velocity}>Km/h</span>
        </Typography>
        <img src={angle} alt={angle} className={classes.icon} />
        <Typography component="p" variant="h4" className={classes.angle}>
          {forecast.wind_deg}&deg;
        </Typography>
      </Box>
    );
  };

  const renderHumidityDetails = () => {
    return (
      <Box className={classNames(classes.row, classes.uPd)}>
        <img src={humidity} alt={humidity} className={classes.icon} />
        <ProgressBar progress={forecast.humidity} />
      </Box>
    );
  };

  const renderCloudinessDetails = () => {
    return (
      <Box className={classes.row}>
        <img src={cloudiness} alt={cloudiness} className={classes.icon} />
        <ProgressBar progress={forecast.clouds} />
      </Box>
    );
  };
  return (
    <Box className={classes.wrapper}>
      {renderSunDetails()}
      <Divider />
      {renderWindDetails()}
      <Divider />
      {renderHumidityDetails()}
      <Divider />
      {renderCloudinessDetails()}
    </Box>
  );
}

Detailed.propTypes = {
  forecast: PropTypes.shape({
    clouds: PropTypes.number.isRequired,
    dew_point: PropTypes.number,
    dt: PropTypes.number.isRequired,
    feels_like: PropTypes.number,
    humidity: PropTypes.number.isRequired,
    pop: PropTypes.number,
    pressure: PropTypes.number,
    rain: PropTypes.number,
    sunrise: PropTypes.number.isRequired,
    sunset: PropTypes.number.isRequired,
    temp: PropTypes.number,
    uvi: PropTypes.number,
    visibility: PropTypes.number,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        icon: PropTypes.string,
        id: PropTypes.number,
        main: PropTypes.string,
      })
    ),
    wind_deg: PropTypes.number.isRequired,
    wind_speed: PropTypes.number.isRequired,
  }).isRequired,
};

export default Detailed;
