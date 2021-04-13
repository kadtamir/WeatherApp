import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import getWeatherIcon from '../utils/getWeatherIcon';
import Tooltip from '@material-ui/core/Tooltip';
import Divider from '@material-ui/core/Divider';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    backgroundColor: fade(theme.palette.common.white, 0.46),
    borderRadius: theme.shape.borderRadius * 5,
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(0),
    padding: theme.spacing(2, 5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1),
    },
  },
  day: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
  icon: {
    height: '100px',
  },
  bold: {
    fontWeight: 'bold',
  },
  tooltipRow: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));

const DayTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.background.paper,
    color: theme.palette.common.white,
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
    textAlign: 'center',
  },
}))(Tooltip);

function Daily({ forecast }) {
  const classes = useStyles();
  const renderDays = () => {
    return forecast.map((day, index) => {
      return (
        index > 0 &&
        index < 7 && (
          <Grid item xs={6} sm={4} md={2} className={classes.day} key={day.dt}>
            <Typography component="h4" variant="h6">
              {moment.unix(day.dt).format('ddd')}
            </Typography>
            <img
              src={getWeatherIcon(
                day.weather[0],
                moment.unix(day.dt).format('HH')
              )}
              alt={day.weather[0].description}
              className={classes.icons}
            />
            <DayTooltip
              title={
                <React.Fragment>
                  <Typography component="p" variant="body2">
                    Hourly Forecast
                  </Typography>
                  <Box className={classes.tooltipRow}>
                    <span className={classes.bold}>06:00</span> :{' '}
                    <span>{Math.round(day.temp.morn)}&deg;</span>
                  </Box>
                  <Divider />
                  <Box className={classes.tooltipRow}>
                    <span className={classes.bold}>12:00</span> :{' '}
                    <span>{Math.round(day.temp.day)}&deg;</span>
                  </Box>
                  <Divider />
                  <Box className={classes.tooltipRow}>
                    <span className={classes.bold}>18:00</span> :{' '}
                    <span>{Math.round(day.temp.eve)}&deg;</span>
                  </Box>
                  <Divider />
                  <Box className={classes.tooltipRow}>
                    <span className={classes.bold}>00:00</span> :{' '}
                    <span>{Math.round(day.temp.night)}&deg;</span>
                  </Box>
                  <Divider />
                </React.Fragment>
              }
            >
              <Typography component="h4" variant="h6">
                {Math.round(day.temp.max)}&deg;/{Math.round(day.temp.min)}
                &deg;
              </Typography>
            </DayTooltip>
          </Grid>
        )
      );
    });
  };

  return (
    <Grid container spacing={2} className={classes.wrapper}>
      {renderDays()}
    </Grid>
  );
}

Daily.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      clouds: PropTypes.number.isRequired,
      dew_point: PropTypes.number,
      dt: PropTypes.number.isRequired,
      feels_like: PropTypes.shape({
        day: PropTypes.number,
        eve: PropTypes.number,
        morn: PropTypes.number,
        night: PropTypes.number,
      }),
      humidity: PropTypes.number,
      pop: PropTypes.number,
      pressure: PropTypes.number,
      rain: PropTypes.number,
      sunrise: PropTypes.number,
      sunset: PropTypes.number,
      temp: PropTypes.shape({
        day: PropTypes.number.isRequired,
        eve: PropTypes.number.isRequired,
        morn: PropTypes.number.isRequired,
        night: PropTypes.number.isRequired,
      }).isRequired,
      uvi: PropTypes.number,
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string.isRequired,
          icon: PropTypes.string,
          id: PropTypes.number,
          main: PropTypes.string,
        })
      ),
      wind_deg: PropTypes.number,
      wind_speed: PropTypes.number,
    })
  ).isRequired,
};

export default Daily;
