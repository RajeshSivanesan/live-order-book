import { act, render, screen } from '@testing-library/react';
//@ts-ignore
import configureStore from 'redux-mock-store'

import OrderBook from './index';
import { Provider } from 'react-redux';

const initialState = {
    orderBook: {
        bids: {},
        asks: {},
        mcnt: 0
    }
}

const mockStore = configureStore()

test('renders OrderBook component with loader ui', async () => {
    await act( async () => {
        const store = mockStore(initialState);
        render(<Provider store={store}><OrderBook isFeedKilled={false} windowWidth={800} /></Provider>);
    });
    const svgElement = screen.queryByTestId('loaderSvg');
    expect(svgElement).toBeTruthy();
});

test('renders OrderBook component with orders list', async () => {
    const newInitialState = {
        orderBook: {
            bids: {
                23456: {
                    price: 23456,
                    cnt: 10,
                    amount: 0.05
                }
            },
            asks: {
                23476: {
                    price: 23476,
                    cnt: 1,
                    amount: 2.05
                }
            },
            mcnt: 0
        }
    }
    await act( async () => {
        const store = mockStore(newInitialState);
        render(<Provider store={store}><OrderBook isFeedKilled={false} windowWidth={800} /></Provider>);
    });
    const priceLevelRow = screen.getAllByTestId('price-level-row');
    expect(priceLevelRow[0]).toBeTruthy();
    expect(priceLevelRow[1]).toBeTruthy();
});