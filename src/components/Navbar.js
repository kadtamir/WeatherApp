import React from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import Radar from './Radar';
import SearchBar from './SearchBar';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    'justify-content': 'space-between',
    padding: 0,
  },
  mobileMenu: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(0),
      padding: theme.spacing(0),
    },
  },
  desktopMenu: {
    '&:not(:last-child)': {
      marginRight: theme.spacing(3),
    },
  },
  logo: {
    height: '50px',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      height: '40px',
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [radar, setRadar] = React.useState(false);
  const menuState = Boolean(anchorEl);
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (target) => {
    setAnchorEl(null);
    switch (target) {
      case 'home':
        history.push('/');
        break;
      case 'radar':
        setRadar(true);
        break;
      case 'about':
        history.push('/about');
        break;
      default:
        break;
    }
  };

  const renderMobileMenu = () => {
    return (
      <React.Fragment>
        <IconButton
          edge="start"
          className={classes.mobileMenu}
          color="inherit"
          aria-label="menu"
          onClick={handleMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={menuState}
          onClose={handleClick}
        >
          <MenuItem onClick={() => handleClick('home')}>Home</MenuItem>
          <MenuItem onClick={() => handleClick('radar')}>Radar</MenuItem>
          <MenuItem onClick={() => handleClick('about')}>About</MenuItem>
        </Menu>
      </React.Fragment>
    );
  };

  const renderDesktopMenu = () => {
    return (
      <div>
        <Button
          className={classes.desktopMenu}
          color="inherit"
          onClick={() => handleClick('home')}
        >
          Home
        </Button>
        <Button
          className={classes.desktopMenu}
          color="inherit"
          onClick={() => handleClick('radar')}
        >
          Radar
        </Button>
        <Button
          className={classes.desktopMenu}
          color="inherit"
          onClick={() => handleClick('about')}
        >
          About
        </Button>
      </div>
    );
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar className={classes.toolbar}>
            <Link to="/">
              <img src={logo} className={classes.logo} alt="logo" />
            </Link>
            <SearchBar />
            {isMobile ? renderMobileMenu() : renderDesktopMenu()}
          </Toolbar>
        </Container>
      </AppBar>
      {radar && <Radar setRadar={setRadar} />}
    </div>
  );
};

export default Navbar;
