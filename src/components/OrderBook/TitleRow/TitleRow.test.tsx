import { render, screen } from '@testing-library/react';

import TitleRow from './index';

test('renders title row properly - not reversed', () => {
  render(<TitleRow
    reversedFieldsOrder={false}
    windowWidth={800}/>);
  const priceElement = screen.getByTestId('title-row');
  const spanElements = priceElement.querySelectorAll('span');
  expect(spanElements[2].textContent).toBe('TOTAL');
});


test('renders title row properly - reversed', () => {
  render(<TitleRow
    reversedFieldsOrder={true}
    windowWidth={800} />);
  const priceElement = screen.getByTestId('title-row');
  const spanElements = priceElement.querySelectorAll('span');
  expect(spanElements[0].textContent).toBe('PRICE');
});

test('renders title row properly - windowWidth < MOBILE_WIDTH', () => {
    render(<TitleRow
      reversedFieldsOrder={false}
      windowWidth={600} />);
    const priceElement = screen.getByTestId('title-row');
    const spanElements = priceElement.querySelectorAll('span');
    expect(spanElements[0].textContent).toBe('PRICE');
  });

test('renders title row properly - default arguments', () => {
    render(<TitleRow windowWidth={600} />);
    const priceElement = screen.getByTestId('title-row');
    const spanElements = priceElement.querySelectorAll('span');
    expect(spanElements[0].textContent).toBe('PRICE');
  });