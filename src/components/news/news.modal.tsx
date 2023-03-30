import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Link } from '@material-ui/core';
import type { NewsPopupProps } from './news.types'

const NewsPopup: React.FC<NewsPopupProps> = ({ author, content, url, isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>{author}</DialogTitle>
      <DialogContent>
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
