import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Dialog, DialogTitle, DialogContent, DialogActions, Toolbar, IconButton } from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { setNewsView } from '../../store/news/newsSlice';
import logo from '../../images/gnnews.png'
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
  const [open, setOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNewsViewChange = () => {
    dispatch(setNewsView(newsView === 'list' ? 'grid' : 'list'));
  };

  const handlePopupOpen = () => {
    setOpen(true);
  };

  const handlePopupClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <div>
          <Link to="/" className={classes.title}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handleNewsViewChange}
          >
            {newsView === 'list' ? 'Grid View' : 'List View'}
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={handlePopupOpen}
          >
            Tell me more
          </Button>
          <IconButton className={classes.menuButton} color="inherit" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <Dialog open={open} onClose={handlePopupClose}>
            <DialogTitle>What I like and dislike</DialogTitle>
            <DialogContent>
              <p>Things I like:</p>
              <ul>
                <li>Learning new things</li>
                <li>Traveling and exploring new places</li>
                <li>Spending time with loved ones</li>
              </ul>
              <p>Things I don't like:</p>
              <ul>
                <li>Cold weather</li>
                <li>Being stuck in traffic</li>
                <li>Watching horror movies</li>
              </ul>
            </DialogContent>
            <DialogActions>
              <Button onClick={handlePopupClose} color="primary" variant="contained">
                Close
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
