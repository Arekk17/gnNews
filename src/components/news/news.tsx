import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure } from '../../store/news/newsSlice';
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NewsPopup from './News.modal';
import type { ArticleState } from './News.types';
import { Article } from '../../types'
import Loading from '../Loading/Loading';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '&:hover':{
      backgroundColor: '#e6e6e6',
      cursor: 'pointer'
    },
  },
  avatar: {
    width: theme.spacing(7),
    height: theme.spacing(7),
    marginRight: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(5),
      height: theme.spacing(5),
      marginRight: theme.spacing(1),
    },
  },
  list: {
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
    padding: theme.spacing(2),
    marginBottom: '30px',
  },
  listItem: {
    marginBottom: '16px',
    '&:hover':{
      backgroundColor: '#e6e6e6',
      cursor: 'pointer'
    },
  },
}));

const NewsSection: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const news = useSelector((state: RootState) => state.news.news);
  const loading = useSelector((state: RootState) => state.news.loading);
  const error = useSelector((state: RootState) => state.news.error);
  const view = useSelector((state: RootState) => state.news.view);
  const selectedCountryCode = useSelector((state: RootState) => state.news.selectedCountryCode)
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [selectedArticle, setSelectedArticle] = useState<ArticleState>({ author: '', content: '', url: '', urlToImage: '' });

  const API_KEY = process.env.REACT_APP_API_NEWS;

  useEffect(() => {
    dispatch(fetchNewsStart());
    fetch(`https://newsapi.org/v2/top-headlines?country=${selectedCountryCode || 'us'}&apiKey=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => dispatch(fetchNewsSuccess(data.articles)))
      .catch((error) => dispatch(fetchNewsFailure(error.message)));
  }, [API_KEY, dispatch, selectedCountryCode]);

const handleView = (article: Article) => {
  setSelectedArticle({ author: article.author, content: article.content, url: article.url, urlToImage: article.urlToImage });
  setIsPopupOpen(true);
}

  return (
    <div className={classes.root}>
      {loading && <Loading />}
      {error && <Typography variant="h6">Error: {error}</Typography>}
      {news && (
        <>
          {view === 'list' ? (
                  <List className={classes.list}>
                  {news.map((article) => (
                   <ListItem 
                      key={article.url}
                      className={classes.listItem} 
                      onClick={() => handleView(article)}
                    >
                    {article.urlToImage && (
                      <ListItemAvatar>
                        <Avatar
                          variant="square"
                          alt={article.title}
                          src={article.urlToImage}
                          className={classes.avatar}
                        />
                      </ListItemAvatar>
                    )}
                      <ListItemText primary={article.title} secondary={article.description}  />
                      <Typography variant="caption">{article.publishedAt}</Typography>
                    </ListItem>
                  ))}
                </List>
          ) : (
            <Grid container spacing={3}>
              {news.map((article) => (
                <Grid key={article.url} item xs={12} sm={6} md={4} onClick={() => handleView(article)}>
                 <Paper className={classes.paper}>
                  <Typography variant="h5">{article.title}</Typography>
                  <Typography variant="subtitle1">{article.description}</Typography>
                  <Typography variant="caption">{article.publishedAt}</Typography>
                    {article.urlToImage && (
                    <div>
                      <img
                        src={article.urlToImage}
                        alt={article.title}
                        style={{ maxWidth: '100%' }}
                      />
                    </div>
                    )}
                </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
      {isPopupOpen && (
        <NewsPopup
          author={selectedArticle.author}
          content={selectedArticle.content}
          url={selectedArticle.url}
          urlToImage={selectedArticle.urlToImage}
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
    </div>
  );
};

export default NewsSection;
