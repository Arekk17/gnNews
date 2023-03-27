import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Drawer, IconButton } from '@material-ui/core';
import ReactCountryFlag from "react-country-flag"
import { ChevronRight } from '@material-ui/icons'
import { selectCountry } from '../../store/news/newsSlice';
import countries from './sidemenu.utils';
import { useDispatch } from 'react-redux';
import { SidebarMenuProps } from './sidemenu.types'

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    backgroundColor: '#ffffff',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#ffffff',
    boxShadow: '0px 0px 15px 0px rgba(0,0,0,0.2)',
  },
  toolbar: theme.mixins.toolbar,
  closeIcon: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  listItem: {
    textDecoration: 'none',
    '&:hover': {
      backgroundColor: '#e6e6e6',
    },
  },
  listItemText: {
    color: '#333',
    fontSize: '1.1rem',
    fontWeight: 500,
  },
  icon: {
    minWidth: '40px',
  },
}));

const SidebarMenu: React.FC<SidebarMenuProps> = ({ open, onClose }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleCountrySelect = (countryCode: string) => {
    dispatch(selectCountry(countryCode));
  };
  
  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="right"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.closeIcon}>
        <IconButton onClick={onClose}>
          <ChevronRight />
        </IconButton>
      </div>
      <Divider />
      <List>
        {countries.map((country) => (
          <Link
            key={country.code}
            to={`/country/${country.name.toLowerCase()}`}
            onClick={() => handleCountrySelect(country.code)}
            className={classes.listItem}
          >
            <ListItem button>
              <ListItemIcon className={classes.icon}>
                <ReactCountryFlag countryCode={country.code} svg />
              </ListItemIcon>
              <ListItemText
                primary={country.name}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </Drawer>
  );
};

export default SidebarMenu;
