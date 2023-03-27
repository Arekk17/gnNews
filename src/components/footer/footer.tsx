import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    background: 'radial-gradient(circle, rgba(104,214,245,1) 0%, rgba(16,156,247,1) 100%)',
    color: '#fff',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  caption: {
    fontSize: '0.9rem',
    fontWeight: 400,
    marginLeft: '10px',
    color: '#fff',
  },
  newsCount: {
    fontSize: '0.9rem',
    fontWeight: 400,
    marginRight: '10px',
    color: '#fff',
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  const [currentDateTime, setCurrentDateTime] = useState(new Date().toLocaleString());
  const newsCount = useSelector((state: RootState) => state.news.news.length);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={classes.footer}>
      <Typography variant="caption" className={classes.caption}>
        {currentDateTime}
      </Typography>
      <Typography variant="caption" className={classes.newsCount}>
        {newsCount} news articles
      </Typography>
    </div>
  );
};

export default Footer;
