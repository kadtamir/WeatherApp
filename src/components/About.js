import React from 'react';
import moment from 'moment';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import Box from '@material-ui/core/Box';
import Tamir from '../images/Tamir.png';
import logo from '../images/logo.png';
import Navbar from './Navbar';

const useStyles = makeStyles((theme) => ({
  aboutMe: {
    width: '100%',
    backgroundColor: fade(theme.palette.common.white, 0.46),
    borderRadius: theme.shape.borderRadius * 5,
    marginTop: theme.spacing(3),
    padding: theme.spacing(2, 10),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: theme.palette.common.black,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      flexDirection: 'column-reverse',
      justifyContent: 'center',
    },
  },
  aboutApp: {
    backgroundColor: fade(theme.background.paper, 0.46),
    borderRadius: theme.shape.borderRadius * 5,
    color: theme.palette.common.white,
    marginTop: theme.spacing(3),
    padding: theme.spacing(2, 10),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      flexDirection: 'column-reverse',
      justifyContent: 'center',
    },
  },
  contactInfo: {
    width: '100%',
    backgroundColor: fade(theme.palette.common.white, 0.46),
    borderRadius: theme.shape.borderRadius * 5,
    marginTop: theme.spacing(3),
    padding: theme.spacing(2, 10),
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.common.black,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  contactMethod: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  text: {
    width: '60%',
    textAlign: 'justify',
    '&>*': {
      marginBottom: theme.spacing(1),
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'left',
    },
  },
  pictureContainer: {
    width: '30%',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
  picture: {
    width: '200px',
    borderRadius: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '150px',
    },
  },
}));

function About() {
  const classes = useStyles();
  const birthday = moment([1995, 3, 9]); // April 9, 1995

  const renderContactInfo = () => {
    return (
      <Box className={classes.contactInfo}>
        <Typography component="h3" variant="h6">
          Contact Info
        </Typography>
        <Box className={classes.contactMethod}>
          <WhatsAppIcon style={{ color: '#4AC959' }} />{' '}
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://api.whatsapp.com/send?phone=972544276701&text=%20"
          >
            {' '}
            Whatsapp
          </Link>
        </Box>
        <Box className={classes.contactMethod}>
          <LinkedInIcon style={{ color: '#2867B2' }} />{' '}
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/tamir-kaduri/"
          >
            {' '}
            LinkedIn
          </Link>
        </Box>
        <Box className={classes.contactMethod}>
          <FacebookIcon style={{ color: '#3b5998' }} />{' '}
          <Link
            target="_blank"
            rel="noreferrer"
            href="https://www.facebook.com/kadtamir/"
          >
            {' '}
            Facebook
          </Link>
        </Box>
        <Box className={classes.contactMethod}>
          <PhoneAndroidIcon /> <Link underline="none"> +972-544276701</Link>
        </Box>
      </Box>
    );
  };

  return (
    <React.Fragment>
      <Navbar />
      <Container maxWidth="lg">
        <Box className={classes.aboutApp}>
          <Box className={classes.text}>
            <Typography component="h2" variant="h4">
              About the App
            </Typography>
            <Typography component="p" variant="body1">
              This weather app is my very first full sacle project. Built with
              React, React-Router and Material-ui using the Context API.
            </Typography>
            <Typography component="p" variant="body1">
              <strong>APIs: </strong>The app initially asks for geolocation
              permission and if denied or unable to perform, guesses the user
              location using the ipinfo.io API. The data is then interperted by
              the Google Geolocation API. The app presents the current, daily
              and hourly weather forecast using the OpenWeather API and
              implements the IMS rain radar (when enabled).
            </Typography>
            <Typography component="p" variant="body1">
              <strong>External libraries: </strong>All the API request are done
              with axios and the dates and hours with moment.js. The hourly
              graph was created using ApexCharts.
            </Typography>
            <Typography component="p" variant="body1">
              <strong>Design and user experience: </strong>The app is completely
              self-designed and attempts to provide good ui visibility and ux
              experience. The app is also fully responsive.
            </Typography>
          </Box>
          <Box className={classes.pictureContainer}>
            <img src={logo} alt="Logo" className={classes.picture} />
          </Box>
        </Box>
        <Box className={classes.aboutMe}>
          <Box className={classes.text}>
            <Typography component="h2" variant="h4">
              About me
            </Typography>
            <Typography component="p" variant="body1">
              My name is Tamir Kaduri and I am a{' '}
              {moment().diff(birthday, 'years')} year old frontend developer
              from Herzliya. I studied medical engineering but during my studies
              I discovered the world of software and decided to make a change. I
              studied C in college and Python in Udemy and then decided to focus
              on the web. I studied HTML, CSS, JavaScript and React in Udemy.
            </Typography>
            <Typography component="p" variant="body1">
              What I lack in experience I make up for with curiosity, a high
              self-learning ability and a real desire to learn and improve. I am
              willing to accept any challenge I'll face and am not afraid to
              also ask for help when needed.{' '}
            </Typography>
            <Typography component="p" variant="body1">
              <strong>
                I am looking for a frontend junior position in a company where I
                can really grow and learn and in return I will make every effort
                to provide as much value as I can.
              </strong>
            </Typography>
            {renderContactInfo()}
          </Box>
          <Box className={classes.pictureContainer}>
            <img src={Tamir} alt="Tamir" className={classes.picture} />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default About;
