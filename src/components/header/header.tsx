import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { selectLanguage, setNewsView } from '../../store/news/newsSlice';
import { translation } from '../../translation';

import SidebarMenu from '../sidemenu/sidemenu';
import Popup from './popup';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: '#000',
    '&:hover': {
      textDecoration: 'none',
    },
  },
  button: {
    marginLeft: theme.spacing(2),
    backgroundColor: '#110a33',
    color: '#fff',
    borderRadius: '10rem',
    '&:hover': {
      transition: 'all 0.3s ease-in-out',
      backgroundColor: '#2f66d3',
    },
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'radial-gradient(circle, rgba(104,214,245,1) 0%, rgba(16,156,247,1) 100%)',
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: theme.spacing(1),
    },
  },
  buttonContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'stretch',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  },
  menuButton: {
    marginLeft: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      marginBottom: theme.spacing(2)
    },
  },
  menuIcon: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const newsView = useSelector((state: RootState) => state.news.view);
  const languageChange = useSelector((state: RootState) => state.news.selectedLanguage)
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const handleNewsViewChange = () => {
    dispatch(setNewsView(newsView === 'list' ? 'grid' : 'list'));
  };

  const handlePopupOpen = (): void => {
    setOpenPopup(true);
  };

  const handlePopupClose = (): void => {
    setOpenPopup(false);
  };

  const handleLanguageChange = (): void => {
    dispatch(selectLanguage(languageChange === 'pl' ? 'en' : 'pl'))
  }

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div>
          <Link to="/" className={classes.title}>
            <img src="/images/gnnews.png" alt="logo" />
          </Link>
        </div>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleNewsViewChange}
          >
            {newsView === 'list' ? translation[languageChange].viewGridLabel : translation[languageChange].viewGridLabel}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handlePopupOpen}
          >
            {translation[languageChange].popUpButton}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleLanguageChange}
          >
            {languageChange === 'pl' ? 'en' : 'pl'}
          </Button>
          <IconButton className={classes.menuButton} color="inherit" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
      <SidebarMenu open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <Popup open={openPopup} onClose={handlePopupClose} />
    </AppBar>
  );
};

export default Header;
