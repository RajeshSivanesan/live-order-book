import { render, screen } from '@testing-library/react';

import Header from './index';

test('renders header component with text', () => {
  render(<Header />);
  const txtElement = screen.getByText(/Order Book BTC\/USD/i);
  expect(txtElement).toBeTruthy();
});