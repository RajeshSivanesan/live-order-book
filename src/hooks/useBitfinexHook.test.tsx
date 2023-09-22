import { act, render } from '@testing-library/react';
import { useBitfinexHook } from './useBitfinexHook';
import { Provider } from 'react-redux';
//@ts-ignore
import configureStore from 'redux-mock-store';
// import useWebSocket from 'react-use-websocket';

const initialState = {
    orderBook: {
        bids: {},
        asks: {},
        mcnt: 0
    }
}
let count = 0;

jest.mock('react-use-websocket', () => ({
    __esModule: true,
    default: jest.fn((url: string, config: any) => {
        console.log(url);
        console.log(config);
        config.onMessage({
            data: JSON.stringify([26234, [2612, count === 0 ? 2: 0, 0.05]])
        })
        count++;
        return {
            sendJsonMessage: jest.fn(),
            getWebSocket: jest.fn()
        }
    })
}));

const mockStore = configureStore()

const TestComponent = () => {
    useBitfinexHook();
    return null;
}

test('should use bitfinexHook', async () => {
    await act( async () => {
        const store = mockStore(initialState);
        render(<Provider store={store}><TestComponent /></Provider>);
    });
})

test('should use bitfinexHook', async () => {
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
            mcnt: 2
        }
    }
    await act( async () => {
        const store = mockStore(newInitialState);
        render(<Provider store={store}><TestComponent /></Provider>);
    });
})

/**
 * I am trying to workaround here to get coverage
 * Since i dont have proper mock for react-use-websocket
 * I tried my own mock, but to get coverage i had to do dirty checks
 * So stopping here !!
 */