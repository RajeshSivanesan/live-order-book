import {
  createSlice,
  PayloadAction,
  configureStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";

const initialState: any = {
  bids: {},
  asks: {},
  precision: "P0",
  mcnt: 0
}

export interface AddBidsAsksPayload {
  price: string | number;
  amount: string | number;
  cnt: string | number;
}

const orderBookSlice = createSlice({
  name: "orderBook",
  initialState,
  reducers: {
    addBids: (state, action: PayloadAction<AddBidsAsksPayload>) => {
      if (Array.isArray(action.payload.price)) {
        state.bids[action.payload.price[0]] = { price: action.payload.price[0], cnt: action.payload.price[1], amount: action.payload.price[2] }
      } else {
        state.bids[action.payload.price] = action.payload;
      }
    },
    addAsks: (state, action: PayloadAction<AddBidsAsksPayload>) => {
      if (Array.isArray(action.payload.price)) {
        state.asks[action.payload.price[0]] = { price: action.payload.price[0], cnt: action.payload.price[1], amount: action.payload.price[2] }
      } else {
        state.asks[action.payload.price] = action.payload;
      }
    },
    deleteBids: (state, action: PayloadAction<any>) => {
      const { [action.payload.price]: match, ...others } = state.bids;
      state.bids = others;
    },
    deleteAsks: (state, action: PayloadAction<any>) => {
      const { [action.payload.price]: match, ...others } = state.asks;
      state.asks = others;
    },
    updateMcntByOne: (state) => {
      state.mcnt++;
    }
  }
});

export const { addBids, addAsks, deleteAsks, deleteBids, updateMcntByOne } = orderBookSlice.actions;

/**
 * Add all the state in local storage
 * @param getState
 * @returns {function(*): function(*=)}
 */
const localStorageMiddleware = ({ getState }: any) => { // <--- FOCUS HERE
  return (next: Function) => (action: PayloadAction) => {
    const result = next(action);
    localStorage.setItem('applicationState', JSON.stringify(
      getState()
    ));
    return result;
  };
};

const reHydrateStore = () => {
  if (localStorage.getItem('applicationState') !== null) {
    //@ts-ignore
    return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
  }
};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, localStorageMiddleware];

const store = configureStore({
  reducer: {
    orderBook: orderBookSlice.reducer
  },
  preloadedState: reHydrateStore(),
  middleware
});

sagaMiddleware.run(saga);

export default store;
