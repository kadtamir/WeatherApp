import React from 'react';
import { useHistory } from 'react-router-dom';

import { useLocation } from '../context/LocationContext';

import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      margin: 0,
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    transition: theme.transitions.create('width'),
    width: '40ch',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

function SearchBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [, setLocation] = useLocation();
  const history = useHistory();

  const handleSearch = (term) => setLocation(term);

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push('/');
    handleSearch(e.target[0].defaultValue);
  };

  return (
    <div className={classes.search}>
      <Button
        color="inherit"
        onClick={() => handleSearch(value)}
        className={classes.searchIcon}
      >
        <SearchIcon />
      </Button>
      <form onSubmit={handleSubmit} className={classes.form}>
        <InputBase
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </form>
    </div>
  );
}

export default SearchBar;
