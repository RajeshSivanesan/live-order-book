import { render, screen } from '@testing-library/react';

import Loader from './index';

test('renders Loader component with text', () => {
  render(<Loader />);
  const svgElement = screen.queryByTestId('loaderSvg');
  expect(svgElement).toBeTruthy();
});