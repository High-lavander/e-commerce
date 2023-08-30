import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '.';

// interface ICustomers {
//   customers: object[];
// }

const initialState = {
  customers: null,
  status: 'idle',
  customersError: '',
  isCustomersLoading: false,
};
export const queryCustomers = () => async (dispatch: AppDispatch) => {
  const response = await fetch(
    `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/customers`,
    {
      method: 'GET',
      headers: {
        // Authorization: `Bearer ${tokenObject.access_token}`,
        'Content-Type': 'application/json',
      },
    }
  );
  dispatch(customersSlice.actions.customersFetchingSuccess(response));

  return response;
};
export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    customersFetching(state) {
      state.isCustomersLoading = true;
      state.customersError = '';
    },
    customersFetchingSuccess(state, action) {
      state.isCustomersLoading = false;
      state.customersError = '';
      state.customers = action.payload;
    },
    customersFetchingError(state, action) {
      state.isCustomersLoading = false;
      state.customersError = action.payload;
    },
  },
});

export const { setCustomers, customersFetching, customersFetchingSuccess, customersFetchingError } =
  customersSlice.actions;
export default customersSlice.reducer;
