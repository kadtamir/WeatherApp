import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const TINY_MOBILE_SIZE = 200;
const MOBILE_SIZE = 290;
const MAX_SIZE = 500;

function getModalStyle() {
  const top = 50;
  const left = 50;
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.primary.main,
    border: '1px solid #000',
    boxShadow: theme.shadows[5],
    padding: 0,
    margin: 0,
    width: MAX_SIZE,
    [theme.breakpoints.down('sm')]: {
      width: MOBILE_SIZE,
    },
    ['@media(max-height:300px)' || theme.breakpoints.down('xs')]: {
      width: TINY_MOBILE_SIZE,
    },
    ['@media(min-height:813px)' || theme.breakpoints.down('sm')]: {
      width: MAX_SIZE,
    },
  },
  frameWrapper: {
    position: 'relative',
    padding: 0,
    margin: 0,
    width: MAX_SIZE,
    height: MAX_SIZE,
    [theme.breakpoints.down('sm')]: {
      width: MOBILE_SIZE,
      height: MOBILE_SIZE,
    },
    ['@media(max-height:300px)' || theme.breakpoints.down('xs')]: {
      width: TINY_MOBILE_SIZE,
      height: TINY_MOBILE_SIZE,
    },
    ['@media(min-height:813px)' || theme.breakpoints.down('sm')]: {
      width: MAX_SIZE,
      height: MAX_SIZE,
    },
  },
  frameBlocker: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '95%',
    height: '95%',
    'z-index': 2,
  },
  header: {
    color: theme.palette.common.white,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(0, 0.5, 0, 0.5),
    },
    ['@media(min-height:813px)' || theme.breakpoints.down('sm')]: {
      padding: theme.spacing(1.5),
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}));

const Radar = ({ setRadar }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [loading, setLoading] = React.useState(true);
  const handleClose = () => setRadar(false);

  const hideSpinner = () => setLoading(false);

  return (
    <React.Fragment>
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Card style={modalStyle} className={classes.paper}>
          <div className={classes.header}>
            <Typography variant="h5" component="h2">
              IMS Rain Radar
            </Typography>
            <IconButton
              aria-label="settings"
              onClick={handleClose}
              className={classes.header}
            >
              <CloseIcon />
            </IconButton>
          </div>
          {loading && (
            <Backdrop
              className={classes.backdrop}
              open={loading}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}
          <div className={classes.frameWrapper}>
            <div className={classes.frameBlocker}></div>
            <iframe
              src="https://www.weather2day.co.il/radar-embed"
              frameBorder="0"
              scrolling="no"
              width="100%"
              height="100%"
              title="Rain radar"
              referrerPolicy="no-referrer"
              style={{ zIndex: 1 }}
              onLoad={hideSpinner}
            ></iframe>
          </div>
        </Card>
      </Modal>
    </React.Fragment>
  );
};

Radar.propTypes = {
  setRadar: PropTypes.func.isRequired,
};

export default Radar;
