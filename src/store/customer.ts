import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CustomerDraft } from '@commercetools/platform-sdk';
import Client from '../sdk/Client';
// import { AppDispatch } from '.';
const initialState = {
  customer: {},
  status: 'idle',
  error: '',
  isCustomerLoading: false,
};

// export const fetchCustomer = (id: string) => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(customerSlice.actions.customerFetching());
//     const response = await Client.queryCustomerById(id);
//     dispatch(customerSlice.actions.customerFetchingSuccess(response.body));
//   } catch (e) {
//     dispatch(customerSlice.actions.customerFetchingError((e as Error).message));
//   }
// };

export const fetchCustomer = createAsyncThunk(
  'customer/fetchCustomer',
  async (id: string) => await Client.queryCustomerById(id)
);

// export const createCustomer = createAsyncThunk(
//   'customer/createCustomer',
//   async (query: { data: CustomerDraft }) => await Client.createCustomer(query.data)
// );

export const createCustomer = createAsyncThunk(
  'customer/createCustomer',
  // Declare the type your function argument here:
  async (data: CustomerDraft) => {
    // const response = await fetch(`https://reqres.in/api/users/${userId}`)
    const response = await Client.createCustomer(data);
    // Inferred return type: Promise<MyData>
    return response;
  }
);

// export const createCustomer = (formData: CustomerDraft) => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(customerSlice.actions.customerFetching());
//     const response = await Client.createCustomer(formData);
//     dispatch(customerSlice.actions.customerFetchingSuccess(response.body));
//   } catch (e) {
//     dispatch(customerSlice.actions.customerFetchingError((e as Error).message));
//   }
// };

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
    customerFetching(state) {
      state.isCustomerLoading = true;
    },
    customerFetchingSuccess(state, action) {
      state.isCustomerLoading = false;
      state.error = '';
      state.customer = action.payload;
    },
    customerFetchingError(state, action) {
      state.isCustomerLoading = false;
      state.error = action.payload;
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
      })
      .addCase(createCustomer.pending, (state) => {
        state.status = 'loading';
        state.isCustomerLoading = true;
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.status = 'idle';
        state.isCustomerLoading = false;
        state.customer = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.isCustomerLoading = false;
      });
  },
  // extraReducers: {
  //   [createCustomer.fulfilled.type]: (state, action) => {
  //     state.isCustomerLoading = false;
  //     state.error = '';
  //     state.customer = action.payload;
  //   },
  //   [createCustomer.pending.type]: (state) => {
  //     state.isCustomerLoading = true;
  //   },
  //   [createCustomer.rejected.type]: (state, action) => {
  //     state.isCustomerLoading = false;
  //     state.error = action.payload;
  //   },
  // },
});
export const { setCustomer } = customerSlice.actions;
export default customerSlice.reducer;
