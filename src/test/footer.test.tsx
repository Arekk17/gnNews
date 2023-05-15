import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/Footer';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore([]);

describe('Footer', () => {
  it('should display current date and time and news count', () => {
    const store = mockStore({
      news: { news: [{ title: 'News 1' }, { title: 'News 2' }] },
    });

    render(
      <Provider store={store}>
        <Footer />
      </Provider>
    );

    expect(screen.getByText(/news articles/i)).toBeInTheDocument();
    expect(screen.getByText(/news articles/i)).toHaveTextContent('2 news articles');
  });
});
