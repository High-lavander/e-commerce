import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import customerReducer from './customer';
import productsReducer from './products';

export const store = configureStore({
  reducer: {
    customer: customerReducer,
    products: productsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
