import { render, screen } from '@testing-library/react';
import Footer from './index';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const initialState = {
  orderBook: {
      bids: {
        1234: {}
      },
      asks: {},
      mcnt: 0
  }
}

const mockStore = configureStore()

test('renders two button when feed is active', () => {
  const store = mockStore(initialState);
  render(<Provider store={store}><Footer killFeedCallback={jest.fn} isFeedKilled={false} /></Provider>);

  const killFeedButton = screen.getByText(/Kill feed/i);
  expect(killFeedButton).toBeTruthy();
});


test('renders `Renew feed` button when feed is not active', () => {
  const store = mockStore(initialState);
  render(<Provider store={store}><Footer killFeedCallback={jest.fn} isFeedKilled={true} /></Provider>);
  const renewFeedButton = screen.getByText(/Renew feed/i);
  expect(renewFeedButton).toBeTruthy();
});

test('renders null when bids is not found', () => {
  const newInitialState = {
    orderBook: {
      bids: {},
      asks: {},
      mcnt: 0
  }
  }
  const store = mockStore(newInitialState);
  render(<Provider store={store}><Footer killFeedCallback={jest.fn} isFeedKilled={true} /></Provider>);
  const renewFeedButton = screen.queryByText(/Renew feed/i);
  expect(renewFeedButton).not.toBeTruthy();
});

test('renders null default argument', () => {
  const newInitialState = {
    orderBook: {
    }
  }
  const store = mockStore(newInitialState);
  render(<Provider store={store}><Footer killFeedCallback={jest.fn} isFeedKilled={true} /></Provider>);
  const renewFeedButton = screen.queryByText(/Renew feed/i);
  expect(renewFeedButton).not.toBeTruthy();
});