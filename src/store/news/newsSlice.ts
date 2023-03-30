import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Article } from '../../types';
import { NewsState, NewsView } from './newsSlice.type'

const initialState: NewsState = {
  view: 'list',
  news: [],
  loading: false,
  error: null,
  selectedCountryCode: null,
  selectedLanguage: 'pl'
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNewsView: (state, action: PayloadAction<NewsView>) => {
      state.view = action.payload;
    },
    fetchNewsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchNewsSuccess: (state, action: PayloadAction<Article[]>) => {
      state.loading = false;
      state.news = action.payload;
    },
    fetchNewsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    selectCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountryCode = action.payload;
    },
    selectLanguage: (state, action: PayloadAction<'pl' | 'en'>) => {
      state.selectedLanguage = action.payload;
    },
  },
});

export const { setNewsView, fetchNewsStart, fetchNewsSuccess, fetchNewsFailure, selectCountry, selectLanguage } = newsSlice.actions;
export default newsSlice.reducer;

