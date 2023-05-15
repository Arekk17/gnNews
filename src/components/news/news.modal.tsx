import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Link, CardMedia } from '@material-ui/core';
import type { NewsPopupProps } from './News.types';

const NewsPopup: React.FC<NewsPopupProps> = ({ author, content, url, urlToImage ,isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{author}</DialogTitle>
      <DialogContent>
        {urlToImage && (
          <CardMedia component="img" src={urlToImage} alt="News Image" />
        )}
        <DialogContentText>{content}</DialogContentText>
        <DialogContentText>
          <Link href={url} target="_blank" rel="noopener">
            {url}
          </Link>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewsPopup;
