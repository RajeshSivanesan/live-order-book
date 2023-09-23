import { render, screen } from '@testing-library/react';
import DepthVisualizer from './index';
import { OrderType } from "../OrderBook";

test('renders depth visualizer with certain width and color', () => {
  render(<DepthVisualizer depth={33} windowWidth={800} orderType={OrderType.BIDS} />);
  const divElement = screen.getByTestId('depth-visualizer');
  expect(divElement).toBeTruthy();
});

test('renders depth visualizer with windowWidth greater than 800', () => {
  render(<DepthVisualizer depth={33} windowWidth={1000} orderType={OrderType.BIDS} />);
  const divElement = screen.getByTestId('depth-visualizer');
  expect(divElement).toBeTruthy();
});