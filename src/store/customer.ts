import { createSlice } from '@reduxjs/toolkit';
import { CustomerDraft } from '@commercetools/platform-sdk';
import { AppDispatch } from '.';
import { NavigateFunction } from 'react-router';

const initialState = () => {
  try {
    const customerString = localStorage.getItem('customer') || '';
    const customer = JSON.parse(customerString);
    return {
      customer,
      status: 'idle',
      customerError: '',
      isCustomerLoading: false,
    };
  } catch {
    return {
      customer: null,
      status: 'idle',
      customerError: '',
      isCustomerLoading: false,
    };
  }
};

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

export const createCustomer =
  (formData: CustomerDraft) => async (dispatch: AppDispatch, navigate: NavigateFunction) => {
    dispatch(customerSlice.actions.customerFetching());
    const tokenObject = await getToken();
    const response: TCustomerResponse = await fetch(
      `https://api.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com/${
        import.meta.env.VITE_CTP_PROJECT_KEY
      }/customers`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenObject.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      }
    ).then((res) => res.json());
    console.log('response in redux', response);
    if ('customer' in response) {
      localStorage.setItem('customer', JSON.stringify(response.customer));
      dispatch(customerSlice.actions.customerFetchingSuccess(response.customer));
      navigate('/');
    } else {
      dispatch(customerSlice.actions.customerFetchingError(response.message));
    }
  };

type TCustomerResponse = ICustomerResponseError | { customer: ICustomer };

interface ICustomerResponseError {
  errors: {
    code: string;
    message: string;
  }[];
  message: string;
  statusCode: number;
}

export const loginCustomer =
  (email: string, password: string) => async (dispatch: AppDispatch, navigate: NavigateFunction) => {
    dispatch(customerSlice.actions.customerFetching());
    const tokenObject = await getToken();
    const response: TCustomerResponse = await fetch(
      `https://api.${import.meta.env.VITE_CTP_API_REGION}.commercetools.com/${
        import.meta.env.VITE_CTP_PROJECT_KEY
      }/login`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${tokenObject.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }
    ).then((res) => res.json());
    if ('customer' in response) {
      localStorage.setItem('customer', JSON.stringify(response.customer));
      dispatch(customerSlice.actions.customerFetchingSuccess(response.customer));
      navigate('/');
    } else {
      dispatch(customerSlice.actions.customerFetchingError(response.message));
    }
  };

export const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    customerFetching(state) {
      state.isCustomerLoading = true;
      state.customerError = '';
    },
    customerFetchingSuccess(state, action) {
      state.isCustomerLoading = false;
      state.customerError = '';
      state.customer = action.payload;
    },
    customerFetchingError(state, action) {
      state.isCustomerLoading = false;
      state.customerError = action.payload;
    },
  },
});

export const { setCustomer, customerFetching, customerFetchingSuccess, customerFetchingError } = customerSlice.actions;
export default customerSlice.reducer;
