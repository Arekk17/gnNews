import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NewsSection from '../components/News/News';
import { Store, AnyAction } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';


const mockStore = configureMockStore([thunk]);

describe('NewsSection', () => {
  let store: Store<unknown, AnyAction>;

  beforeEach(() => {
    store = mockStore({
      news: {
        news: [
          {
            author: 'John Doe',
            title: 'Test article',
            description: 'This is a test article',
            url: 'https://example.com',
            urlToImage: 'https://example.com/image.png',
            publishedAt: '2022-03-28T12:00:00Z',
          },
        ],
        loading: false,
        error: null,
        view: 'list',
        selectedCountryCode: 'us',
      },
    });
  });

  it('renders news list when view is set to "list"', () => {
    render(
      <Provider store={store}>
        <NewsSection />
      </Provider>
    );

    expect(screen.getByText('Test article')).toBeInTheDocument();
  });

  it('renders news grid when view is set to "grid"', () => {
    store = mockStore({
      news: {
        news: [
          {
            author: 'John Doe',
            title: 'Test article',
            description: 'This is a test article',
            url: 'https://example.com',
            urlToImage: 'https://example.com/image.png',
            publishedAt: '2022-03-28T12:00:00Z',
          },
        ],
        loading: false,
        error: null,
        view: 'grid',
        selectedCountryCode: 'us',
      },
    });

    render(
      <Provider store={store}>
        <NewsSection />
      </Provider>
    );

    expect(screen.getByText('Test article')).toBeInTheDocument();
  });

  it('opens news popup when news item is clicked', () => {
    render(
      <Provider store={store}>
        <NewsSection />
      </Provider>
    );

    fireEvent.click(screen.getByText('Test article'));

    expect(screen.getByText('This is a test article')).toBeInTheDocument();
  });
});
