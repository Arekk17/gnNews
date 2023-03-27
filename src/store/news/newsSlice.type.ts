import { Article } from "../../types";

export type NewsView = 'list' | 'grid';
export interface NewsState {
    view: NewsView;
    news: Article[];
    loading: boolean;
    error: string | null;
    selectedCountryCode: string | null;
    selectedLanguage: 'pl' | 'en' ;
  }