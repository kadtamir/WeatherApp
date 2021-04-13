import React from 'react';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { fade, makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { getCategories, getTemperatures } from '../utils/hourlyGraphUtils';

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
}));

function Hourly({ forecast }) {
  const classes = useStyles();
  const theme = useTheme();
  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: getCategories(forecast),
      labels: {
        maxHeight: 100,
      },
    },
    yaxis: {
      title: {
        text: 'Degrees Celsius',
      },
    },
    dataLabels: {
      enabled: true,
    },
    title: {
      text: 'Hourly Forecast',
      align: 'left',
      margin: 20,
      offsetY: 20,
      style: {
        ...theme.typography.h4,
      },
    },
    tooltip: {
      enabled: true,
      custom: () => null,
    },
    grid: {
      show: false,
    },
    noData: {
      text: 'Loading Data...',
      align: 'center',
      verticalAlign: 'middle',
      offsetX: 0,
      offsetY: 0,
      style: {
        color: '#333',
        fontSize: theme.typography.fontSize,
        fontFamily: theme.typography.fontFamily,
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {},
      },
    ],
  };

  const series = [
    {
      name: 'Forecast',
      data: getTemperatures(forecast),
    },
  ];

  return (
    <Box className={classes.wrapper}>
      <Chart options={options} series={series} height="300" />
    </Box>
  );
}

Hourly.propTypes = {
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      clouds: PropTypes.number,
      dew_point: PropTypes.number,
      dt: PropTypes.number.isRequired,
      feels_like: PropTypes.number,
      humidity: PropTypes.number,
      pop: PropTypes.number,
      pressure: PropTypes.number,
      rain: PropTypes.object,
      temp: PropTypes.number.isRequired,
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

export default Hourly;
