import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '.';

interface IAddress {
  id: string;
  title: string;
  firstName: string;
  lastName: string;
  streetName: string;
  streetNumber: string;
  postalCode: string;
  city: string;
  country: string;
  phone: string;
  mobile: string;
  email: string;
}

interface IQueryCustomer {
  id: string;
  version: number;
  versionModifiedAt: string;
  lastMessageSequenceNumber: number;
  createdAt: string;
  lastModifiedAt: string;
  lastModifiedBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  createdBy: {
    clientId: string;
    isPlatformClient: boolean;
  };
  customerNumber?: string;
  email: string;
  firstName: string;
  lastName: string;
  title?: string;
  dateOfBirth?: string;
  password: string;
  addresses: IAddress[];
  defaultShippingAddressId?: string;
  shippingAddressIds: string[];
  defaultBillingAddressId?: string;
  billingAddressIds: string[];
  isEmailVerified: boolean;
  key?: string;
  stores: [];
  authenticationMode: string;
}

interface ICustomerResponseError {
  errors: {
    code: string;
    message: string;
    detailedErrorMessage: string;
  }[];
  message: string;
  statusCode: number;
}

interface IUserProfileReducer {
  userProfile: IQueryCustomer | null;
  status: string;
  userProfileError: string;
  userProfileMessage: string;
  isUserProfileLoading: boolean;
}
const initialState: IUserProfileReducer = {
  userProfile: null,
  status: 'idle',
  userProfileError: '',
  userProfileMessage: '',
  isUserProfileLoading: false,
};

const getToken = () => {
  return fetch(`https://auth.${process.env.VITE_CTP_API_REGION}.commercetools.com/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${process.env.VITE_CTP_CLIENT_ID}:${process.env.VITE_CTP_CLIENT_SECRET}`),
    },
    body: `grant_type=client_credentials&scope=manage_project:${process.env.VITE_CTP_PROJECT_KEY}`,
  }).then((res) => res.json());
};

export const getCustomerById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(userProfileSlice.actions.userProfileFetching());
  const tokenObject = await getToken();
  const response = await fetch(
    `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/customers/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenObject.access_token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => dispatch(userProfileSlice.actions.userProfileFetchingSuccess(data)))
    .catch((e) => dispatch(userProfileSlice.actions.userProfileFetchingError('Error' + e)));
  console.log('response in REDUX', response);
};

export const updateCustomer = (id: string, formData: string) => async (dispatch: AppDispatch) => {
  dispatch(userProfileSlice.actions.userProfileFetching());
  const tokenObject = await getToken();
  fetch(
    `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/customers/${id}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenObject.access_token}`,
        'Content-Type': 'application/json',
      },
      body: formData,
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      if ('errors' in (data as ICustomerResponseError)) {
        dispatch(
          userProfileSlice.actions.userProfileFetchingError(data.errors?.[0].detailedErrorMessage || data.message)
        );
        return;
      }
      dispatch(userProfileSlice.actions.userProfileFetchingSuccess(data));
      dispatch(userProfileSlice.actions.userProfileFetchMessage('Successfully updated'));
    })
    .catch((e) => dispatch(userProfileSlice.actions.userProfileFetchingError(e)));
};
export const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    userProfileFetching(state) {
      state.isUserProfileLoading = true;
      state.userProfileError = '';
      state.userProfileMessage = '';
    },
    userProfileFetchingSuccess(state, action) {
      state.isUserProfileLoading = false;
      state.userProfileError = '';
      state.userProfile = action.payload;
    },
    userProfileFetchingError(state, action) {
      state.isUserProfileLoading = false;
      state.userProfileMessage = '';
      state.userProfileError = action.payload;
    },
    userProfileFetchMessage(state, action) {
      state.userProfileMessage = action.payload;
    },
  },
});

export const {
  setUserProfile,
  userProfileFetching,
  userProfileFetchingSuccess,
  userProfileFetchingError,
  userProfileFetchMessage,
} = userProfileSlice.actions;
export default userProfileSlice.reducer;
