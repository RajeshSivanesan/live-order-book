import { render, screen } from '@testing-library/react';

import PriceLevelRow from './index';

test('renders price level row properly - not reversed', () => {
  render(<PriceLevelRow
    price={'1000'}
    amount={'20'}
    size={'500'}
    total={'50000'} windowWidth={800} />);
  const priceElement = screen.getByTestId('price-level-row');
  const spanElements = priceElement.querySelectorAll('span');
  expect(spanElements[3].className).toBe('price');
});


test('renders price level row properly - reversed', () => {
  render(<PriceLevelRow
    price={'1000'}
    amount={'20'}
    reversedFieldsOrder={true}
    size={'500'}
    total={'50000'} windowWidth={800} />);
  const priceElement = screen.getByTestId('price-level-row');
  const spanElements = priceElement.querySelectorAll('span');
  expect(spanElements[0].className).toBe('price');
});