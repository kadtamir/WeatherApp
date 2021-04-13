import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import getWeatherIcon from '../utils/getWeatherIcon';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    backgroundColor: fade(theme.background.paper, 0.46),
    borderRadius: theme.shape.borderRadius * 5,
    marginTop: theme.spacing(3),
    padding: theme.spacing(2, 10),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.common.white,
    '& > *': {
      width: '30%',
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
      '& > *': {
        width: '50%',
      },
    },
  },
  right: {
    textAlign: 'end',
  },
  bold: {
    fontWeight: 'bold',
  },
  display: {
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '70%',
    },
  },
  minMax: {
    marginRight: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: 'bold',
    [theme.breakpoints.down('xs')]: {
      paddingRight: theme.spacing(0),
    },
  },
}));

const capitalize = (term) => term.charAt(0).toUpperCase() + term.slice(1);

function MainForecast({ forecast, location }) {
  const classes = useStyles();
  const { current, day } = forecast;
  return (
    <Box className={classes.wrapper}>
      <Box>
        <Typography variant="h4" component="h1">
          Weather in {capitalize(location.city)}
        </Typography>
        <Typography variant="caption" component="p">
          {moment.unix(current.dt).format('DD/MM/YYYY HH:mm:ss')}
        </Typography>
        <Typography variant="subtitle1" component="p">
          {Math.round(current.temp)}&deg; Feels like
        </Typography>
        <Typography variant="h3" component="p" className={classes.bold}>
          {Math.round(current.feels_like)}&deg;
        </Typography>
        <Typography variant="h6" component="p">
          {capitalize(current.weather[0].description)}
        </Typography>
      </Box>
      <Box className={classes.right}>
        <img
          src={getWeatherIcon(
            current.weather[0],
            moment.unix(current.dt).format('HH')
          )}
          alt={current.weather[0].description}
          className={classes.display}
        />
        <Typography variant="h4" component="p" className={classes.minMax}>
          {Math.round(day.max)}&deg;/{Math.round(day.min)}&deg;
        </Typography>
      </Box>
    </Box>
  );
}

MainForecast.propTypes = {
  forecast: PropTypes.shape({
    current: PropTypes.shape({
      clouds: PropTypes.number,
      dew_point: PropTypes.number,
      dt: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number,
      pop: PropTypes.number,
      pressure: PropTypes.number,
      sunrise: PropTypes.number,
      sunset: PropTypes.number,
      temp: PropTypes.number.isRequired,
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
    day: PropTypes.shape({
      day: PropTypes.number,
      eve: PropTypes.number,
      max: PropTypes.number.isRequired,
      min: PropTypes.number.isRequired,
      morn: PropTypes.number,
      night: PropTypes.number,
    }).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    city: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    set: PropTypes.bool,
  }).isRequired,
};

export default MainForecast;
