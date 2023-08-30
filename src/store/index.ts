import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import customerReducer from './customer';
import customersReducer from './customers';
import userProfileReducer from './userProfile';

const rootReducer = combineReducers({
  customer: customerReducer,
  customers: customersReducer,
  userProfile: userProfileReducer,
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
