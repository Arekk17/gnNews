import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import Header from '../components/header/header';

const mockStore = configureStore<{ news: { view: string; selectedLanguage: string } }>([]);

describe('Header component', () => {
  let store: MockStoreEnhanced;

  beforeEach(() => {
    store = mockStore({
      news: {
        view: 'list',
        selectedLanguage: 'en',
      },
    });
  });

  it('should render the logo', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
  });

  it('should change news view on button click', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const viewButton = screen.getByText('View grid');

    fireEvent.click(viewButton);

    expect(store.getActions()).toEqual([{ type: 'news/setNewsView', payload: 'grid' }]);
  });

  it('should open and close popup on button click', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const popupButton = screen.getByText('Open popup');
    const popupTitle = screen.getByText('Trudność i Frajda');
    const closeButton = screen.getByText('Close');

    fireEvent.click(popupButton);

    expect(popupTitle).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(popupTitle).not.toBeInTheDocument();
  });

  it('should change language on button click', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const languageButton = screen.getByText('pl');

    fireEvent.click(languageButton);

    expect(store.getActions()).toEqual([{ type: 'news/selectLanguage', payload: 'pl' }]);
  });

  it('should open and close sidebar on menu icon click', () => {
    render(
      <Provider store={store}>
        <Header />
      </Provider>
    );

    const menuIcon = screen.getByLabelText('menu');

    fireEvent.click(menuIcon);

    expect(screen.getByLabelText('close')).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('close'));

    expect(screen.queryByLabelText('close')).not.toBeInTheDocument();
  });
});
