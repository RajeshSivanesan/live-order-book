import { render, screen } from '@testing-library/react';
import Button from './index';

test('renders button with title', () => {
  render(<Button backgroundColor={'red'} callback={jest.fn} title={'Toggle'} />);
  const btnElement = screen.getByText(/Toggle/i);
  expect(btnElement).toBeTruthy();
});

test('renders button with title - default arguments', () => {
  render(<Button callback={jest.fn} title={'Toggle'} />);
  const btnElement = screen.getByText(/Toggle/i);
  expect(btnElement).toBeTruthy();
});