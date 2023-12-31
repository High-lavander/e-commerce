import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import tokenReducer from './token';
import customerReducer from './customer';
import customersReducer from './customers';
import userProfileReducer from './userProfile';
import productDetailReducer from './productDetail';
import basketReducer from './basket';

const rootReducer = combineReducers({
  customer: customerReducer,
  token: tokenReducer,
  customers: customersReducer,
  userProfile: userProfileReducer,
  productDetail: productDetailReducer,
  basket: basketReducer,
});
export const setupStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: true,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
