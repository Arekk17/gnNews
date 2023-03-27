import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Dialog, DialogTitle, DialogContent, DialogActions, Toolbar, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { selectLanguage, setNewsView } from '../../store/news/newsSlice';
import { translation } from '../../translation';

import SidebarMenu from '../sidemenu/sidemenu';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
    textDecoration: 'none',
    color: '#000',
    '&:hover': {
      color: '#000',
      textDecoration: 'none',
    },
  },
  button: {
    marginLeft: theme.spacing(2),
    backgroundColor: '#110a33',
    color: 'white',
    borderRadius: '10rem',
    '&:hover': {
      transition: 'all 0.3s ease-in-out',
      backgroundColor: '#2f66d3',
    },
  },
  menuButton: {
    marginLeft: '1em',
    marginRight: -12,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'radial-gradient(circle, rgba(104,214,245,1) 0%, rgba(16,156,247,1) 100%)',
    color: '#000',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '10px'
    },
  },
}));

const Header: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const newsView = useSelector((state: RootState) => state.news.view);
  const languageChange = useSelector((state: RootState) => state.news.selectedLanguage)
  const [open, setOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const handleNewsViewChange = () => {
    dispatch(setNewsView(newsView === 'list' ? 'grid' : 'list'));
  };

  const handlePopupOpen = (): void => {
    setOpen(true);
  };

  const handlePopupClose = (): void => {
    setOpen(false);
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
        <div>
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
          <Dialog open={open} onClose={handlePopupClose}>
            <DialogTitle>Trudność i Frajda</DialogTitle>
            <DialogContent>
              <p>Najwieksze trudnosci</p>
              <ul>
                <li>Musiałem się podszkolić w uzyciu reduxa co mogę uważac za poczatkowa trudność</li>
              </ul>
              <p>Najwieksza frajda:</p>
              <ul>
                <li>Budowa całej strony</li>
                <li>Stylizacja</li>
                <li>Rozwijacie swoich kompetencji</li>
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePopupClose} color="primary" variant="contained">
              {translation[languageChange].closeButton}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Toolbar>
      <SidebarMenu open={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </AppBar>
  );
};

export default Header;
