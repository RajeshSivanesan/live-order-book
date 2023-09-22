import { render, screen } from '@testing-library/react';
import Footer from './index';

test('renders two button when feed is active', () => {
  render(<Footer killFeedCallback={jest.fn} isFeedKilled={false} />);

  const killFeedButton = screen.getByText(/Kill feed/i);
  expect(killFeedButton).toBeTruthy();
});


test('renders `Renew feed` button when feed is not active', () => {
  render(<Footer killFeedCallback={jest.fn} isFeedKilled={true} />);
  const renewFeedButton = screen.getByText(/Renew feed/i);
  expect(renewFeedButton).toBeTruthy();
});