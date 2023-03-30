import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { translation } from '../../translation';

interface PopupProps {
  open: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ open, onClose }) => {
  const languageChange = useSelector((state: RootState) => state.news.selectedLanguage);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Trudność i Frajda</DialogTitle>
      <DialogContent>
        <p>Najwieksze trudnosci</p>
        <ul>
          <li>Miałem mały początkowy problem z redux z którym sie uporałem</li>
          <li>Pisanie testów. Nie pisałem testów na froncie i musialem sie nauczyc.</li>
        </ul>
        <p>Najwieksza frajda:</p>
        <ul>
          <li>Budowa całej strony</li>
          <li>Stylizacja</li>
          <li>Rozwijacie swoich kompetencji</li>
        </ul>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" variant="contained">
          {translation[languageChange].closeButton}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
