import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  progress: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    height: '30px',
    width: '70%',
    borderRadius: theme.shape.borderRadius * 5,
    [theme.breakpoints.down('sm')]: {
      height: '25px',
      width: '73.5%',
    },
  },
  progressDone: {
    backgroundColor: 'rgba(0, 163, 255, 0.59)',
    borderRadius: 20,
    height: '100%',
  },
  text: {
    position: 'absolute',
    top: '20%',
    left: '50%',
    color: theme.palette.common.black,
    fontWeight: 'bold',
  },
}));

function ProgressBar({ progress }) {
  const classes = useStyles();
  return (
    <div className={classes.progress}>
      <div
        className={classes.progressDone}
        style={{ width: `${progress}%` }}
      ></div>
      <span className={classes.text}>{progress}%</span>
    </div>
  );
}

ProgressBar.propTypes = {
  progress: PropTypes.number.isRequired,
};

export default ProgressBar;
