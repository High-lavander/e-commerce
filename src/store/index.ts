import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import customerReducer from './customer';
import productsReducer from './products';

const rootReducer = combineReducers({
  customer: customerReducer,
  products: productsReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
