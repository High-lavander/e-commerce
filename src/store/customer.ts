import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
  customer: {},
  status: 'idle',
  error: null,
  isCustomerLoading: false,
  fetchDataMessage: '',
};

interface IAuthenticateCustomerPayload {
  email: string;
  password: string;
}

interface ICreateCustomerPayload {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

interface ICustomer {
  email: string;
  firstName: string;
  id: string;
  isEmailVerified: boolean;
  lastName: string;
  password: string;
  version: number;
  createdAt: string;
  lastModifiedAt: string;
  authenticationMode: string;
}

const getToken = () => {
  return fetch(`https://auth.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}`),
    },
    body: `grant_type=client_credentials&scope=manage_project:${import.meta.env.VITE_CTP_PROJECT_KEY}`,
  }).then((res) => res.json());
};

const createCustomer = createAsyncThunk('customer/createCustomer', async (payload: ICreateCustomerPayload) => {
  const tokenObject = await getToken();

  const createCustomerResponse: ICustomer = await fetch(
    `https://api.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com/${
      import.meta.env.VITE_CTP_PROJECT_KEY
    }/customers`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenObject.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }
  ).then((res) => res.json());

  return createCustomerResponse;
});

const authenticateCustomer = createAsyncThunk(
  'customer/authenticateCustomer',
  async (payload: IAuthenticateCustomerPayload) => {
    const tokenObject = await getToken();

    const authenticateCustomerResponse: ICustomer = await fetch(
      `https://api.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com/${
        import.meta.env.VITE_CTP_PROJECT_KEY
      }/login`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenObject.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }
    ).then((res) => res.json());

    return authenticateCustomerResponse;
  }
);

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    logoutCustomer: (state) => {
      state.customer = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCustomer.pending, (state) => {
        state.isCustomerLoading = true;
        state.status = 'pending';
      })
      .addCase(createCustomer.fulfilled, (state, action) => {
        state.isCustomerLoading = false;
        state.status = 'fulfilled';
        state.fetchDataMessage = 'Successful,redirecting to home page...';
        state.customer = action.payload;
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isCustomerLoading = false;
        state.status = 'rejected';
        state.error = action.error;
      })
      .addCase(authenticateCustomer.pending, (state) => {
        state.isCustomerLoading = true;
      })
      .addCase(authenticateCustomer.fulfilled, (state, action) => {
        state.isCustomerLoading = false;
        state.status = 'fulfilled';
        state.customer = action.payload;
      });
  },
});

export { createCustomer, authenticateCustomer };
export const { logoutCustomer } = customerSlice.actions;
export default customerSlice.reducer;
