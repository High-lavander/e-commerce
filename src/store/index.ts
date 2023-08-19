import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import customerReducer from './customer';
import productsReducer from './products';

const rootReducer = combineReducers({
  customer: customerReducer,
  products: productsReducer,
});
export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
