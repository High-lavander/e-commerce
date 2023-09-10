import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '.';

const initialState = {
  productDetail: null,
  productDetailError: '',
  productDetailMessage: '',
  isProductDetailLoading: false,
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

export const getProductById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(productDetailSlice.actions.productDetailSliceFetchStart);
  const tokenObject = await getToken();
  fetch(
    `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/products/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenObject.access_token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if ('errors' in data) {
        dispatch(
          productDetailSlice.actions.productDetailFetchError(data.errors?.[0].detailedErrorMessage || data.message)
        );
        return;
      }
      dispatch(productDetailSlice.actions.productDetailFetchSuccess(data));
      dispatch(productDetailSlice.actions.productDetailFetchMessage('Details loaded'));
    });
};
export const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    productDetailSliceFetchStart: (state) => {
      state.isProductDetailLoading = true;
      state.productDetailError = '';
      state.productDetailMessage = '';
    },
    productDetailFetchSuccess: (state, action) => {
      state.isProductDetailLoading = false;
      state.productDetail = action.payload;
      state.productDetailError = '';
    },
    productDetailFetchError: (state, action) => {
      state.isProductDetailLoading = false;
      state.productDetailMessage = '';
      state.productDetailError = action.payload;
    },
    productDetailFetchMessage(state, action) {
      state.productDetailMessage = action.payload;
    },
  },
});

export const {
  productDetailSliceFetchStart,
  productDetailFetchSuccess,
  productDetailFetchError,
  productDetailFetchMessage,
} = productDetailSlice.actions;
export default productDetailSlice.reducer;
