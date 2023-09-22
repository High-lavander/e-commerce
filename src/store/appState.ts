import { tokenSLice } from './token';
import { customerSlice } from './customer';
import { userProfileSlice } from './userProfile';
import { basketSlice } from './basket';

export const appState = {
  token: tokenSLice,
  cusmer: customerSlice,
  userProfile: userProfileSlice,
  basket: basketSlice,
};
