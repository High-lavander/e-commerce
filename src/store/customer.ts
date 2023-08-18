import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerDraft } from '@commercetools/platform-sdk';
import Client from '../sdk/Client';
const initialState = {
  customer: {},
  status: 'idle',
};

export const fetchCustomer = createAsyncThunk(
  'customer/fetchCustomer',
  async (query: { id: string }) => await Client.queryCustomerById(query.id)
);

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  async (query: { data: CustomerDraft }) => await Client.createCustomer(query.data)
);

export const loginCustomer = createAsyncThunk(
  'customer/loginCustomer',
  async (query: { email: string; password: string }) => await Client.loginCustomer(query.email, query.password)
);

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomer.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomer.fulfilled, (state, action) => {
        state.status = 'idle';
        state.customer = action.payload;
      })
      .addCase(fetchCustomer.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
export const { setCustomer } = customerSlice.actions;
export default customerSlice.reducer;
