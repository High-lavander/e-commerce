import { createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '.';

// interface Cart = Basket
interface IBasket {
  id: string;
  version: number;
  key?: string;
  customerId?: string;
  customerEmail?: string;
  customerGroup?: ICustomerGroupReference;
  anonymousId?: string;
  businessUnit?: object;
  store?: object;
  lineItems: ILineItem[];
}

export interface ILineItem {
  id: string;
  key?: string;
  productId: string;
  productKey?: string;
  name: string;
  productSLug?: string;
  productType: IProductTypeReference;
  variant: { id: string };
  price: {
    id: string;
    value: ITypedMoney;
  };
  quantity: number;
  totalPrice: ITypedMoney;
  discountedPricePerQuantity: IDiscountedLineItemPriceForQuantity[];
  taxedPrice?: object;
  taxedPricePortions: [];
  state: [];
  perMethodTaxRate: [];
  priceMode: object;
  lineItemMode: object;
}

interface IDiscountedLineItemPriceForQuantity {
  quantity: number;
  discountedPrice: { value: ITypedMoney; includedDiscounts: [] };
}
interface ITypedMoney {
  centAmount: number;
  currencyCode: string;
  type: string;
  fractionDigits: number;
}
interface IProductTypeReference {
  id: string;
  typeId: string;
  obj: IProductType;
}

interface IProductType {
  id: string;
  version: number;
  key?: string;
  name: string;
  description: string;
  attributes?: [];
  createdAt: string;
  createdBy?: string;
  lastModifiedAt: string;
  lastModifiedBy?: string;
}
interface ICustomerGroupReference {
  id: string;
  typeId: string;
  obj?: ICustomerGroup;
}

interface ICustomerGroup {
  id: string;
  version: number;
  key?: string;
  name: string;
}

interface IBasketState {
  basket?: IBasket | null;
  basketError: string;
  basketMessage: string;
  isBasketLoading: boolean;
}

interface IBasketRequestBody {
  version: number;
  actions: IBasketAction[];
}

interface IBasketAction {
  action: CartActionsType;
  customerId?: string;
  productId?: string;
  lineItemId?: string;
  variantId?: number;
  quantity?: number;
}

export enum CartActionsType {
  ADDITEM = 'addLineItem',
  REMOVEITEM = 'removeLineItem',
  ADDDISCOUNT = 'addDiscountCode',
  REMOVEDISCOUNT = 'removeDiscountCode',
  RECALCULATE = 'recalculate',
  CHANGEQUANTITY = 'changeLineItemQuantity',
  SETITEMPRICE = 'setLineItemPrice',
  SETITEMTOTALPRICE = 'setLineItemTotalPrice',
  SETCUSTOMERID = 'setCustomerId',
  SETANONYMOUSID = 'setAnonymousId',
}
const initialState = (): IBasketState => {
  try {
    const basketString = localStorage.getItem('basket') || '';
    const basket = JSON.parse(basketString);
    return {
      basket,
      basketError: '',
      basketMessage: '',
      isBasketLoading: false,
    };
  } catch {
    return {
      basket: null,
      basketError: '',
      basketMessage: '',
      isBasketLoading: false,
    };
  }
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

export const queryBaskets = async (dispatch: AppDispatch) => {
  dispatch(basketSlice.actions.basketFetching());
  const tokenObject = await getToken();
  fetch(`https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/carts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokenObject.access_token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if ('errors' in data) {
        dispatch(basketSlice.actions.basketFetchingError(data.errors?.[0].detailedErrorMessage || data.message));
        return;
      }
      dispatch(basketSlice.actions.basketFetchingSuccess(data));
    })
    .catch((e) => dispatch(basketSlice.actions.basketFetchingError('Error' + e)));
};

export const getBasketById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(basketSlice.actions.basketFetching());
  const tokenObject = await getToken();
  fetch(
    `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/carts/${id}`,
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
        dispatch(basketSlice.actions.basketFetchingError(data.errors?.[0].detailedErrorMessage || data.message));
        return;
      }
      dispatch(basketSlice.actions.basketFetchingSuccess(data));
    })
    .catch((e) => dispatch(basketSlice.actions.basketFetchingError('Error' + e)));
};

export const getBasketByCustomerId = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(basketSlice.actions.basketFetching());
  const tokenObject = await getToken();
  fetch(
    `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/carts/customer-id=${id}`,
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
        dispatch(basketSlice.actions.basketFetchingError(data.errors?.[0].detailedErrorMessage || data.message));
        return;
      }
      dispatch(basketSlice.actions.basketFetchingSuccess(data));
    })
    .catch((e) => dispatch(basketSlice.actions.basketFetchingError('Error' + e)));
};

export const createBasket = async (dispatch: AppDispatch) => {
  dispatch(basketSlice.actions.basketFetching());
  const tokenObject = await getToken();
  fetch(`https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/carts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${tokenObject.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currency: 'EUR',
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if ('errors' in data) {
        dispatch(basketSlice.actions.basketFetchingError(data.errors?.[0].detailedErrorMessage || data.message));
        return;
      }
      try {
        localStorage.setItem('basket', JSON.stringify(data));
      } catch (e) {
        console.log('Error localstorage \n', e);
      }
      dispatch(basketSlice.actions.basketFetchingSuccess(data));
    })
    .catch((e) => dispatch(basketSlice.actions.basketFetchingError('Error' + e)));
};

export const replicateBasket = (cartReferenceId: string) => async (dispatch: AppDispatch) => {
  dispatch(basketSlice.actions.basketFetching());
  const tokenObject = await getToken();
  fetch(
    `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/carts/replicate`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenObject.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reference: {
          id: cartReferenceId,
          typeId: 'cart',
        },
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if ('errors' in data) {
        dispatch(basketSlice.actions.basketFetchingError(data.errors?.[0].detailedErrorMessage || data.message));
        return;
      }
      try {
        localStorage.setItem('basket', JSON.stringify(data));
      } catch (e) {
        console.log('Error localstorage \n', e);
      }
      dispatch(basketSlice.actions.basketFetchingSuccess(data));
    })
    .catch((e) => dispatch(basketSlice.actions.basketFetchingError('Error' + e)));
};

export const updateBasketById = (id: string, postForm: IBasketRequestBody) => async (dispatch: AppDispatch) => {
  dispatch(basketSlice.actions.basketFetching());
  const tokenObject = await getToken();
  fetch(
    `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/carts/${id}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenObject.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postForm),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if ('errors' in data) {
        dispatch(basketSlice.actions.basketFetchingError(data.errors?.[0].detailedErrorMessage || data.message));
        return;
      }
      try {
        localStorage.setItem('basket', JSON.stringify(data));
      } catch (e) {
        console.log('Error localstorage \n', e);
      }
      dispatch(basketSlice.actions.basketFetchingSuccess(data));
    })
    .catch((e) => dispatch(basketSlice.actions.basketFetchingError('Error' + e)));
};

export const recalculateBasketById = (id: string) => async (dispatch: AppDispatch) => {
  dispatch(basketSlice.actions.basketFetching());
  const tokenObject = await getToken();
  fetch(
    `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/carts/${id}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenObject.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'recalculate',
        updateProductData: true,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if ('errors' in data) {
        dispatch(basketSlice.actions.basketFetchingError(data.errors?.[0].detailedErrorMessage || data.message));
        return;
      }
      try {
        localStorage.setItem('basket', JSON.stringify(data));
      } catch (e) {
        console.log('Error localstorage \n', e);
      }
      dispatch(basketSlice.actions.basketFetchingSuccess(data));
    })
    .catch((e) => dispatch(basketSlice.actions.basketFetchingError('Error' + e)));
};

export const deleteBasketById = (id: string, version: number) => async (dispatch: AppDispatch) => {
  dispatch(basketSlice.actions.basketFetching());
  const tokenObject = await getToken();
  fetch(
    `https://api.${process.env.VITE_CTP_API_REGION}.commercetools.com/${process.env.VITE_CTP_PROJECT_KEY}/carts/${id}?version=${version}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${tokenObject.access_token}`,
        'Content-Type': 'application/json',
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      if ('errors' in data) {
        dispatch(basketSlice.actions.basketFetchingError(data.errors?.[0].detailedErrorMessage || data.message));
        return;
      }
      try {
        localStorage.removeItem('basket');
      } catch (e) {
        console.log('Error localstorage \n', e);
      }
      dispatch(basketSlice.actions.basketFetchingSuccess(data));
    })
    .catch((e) => dispatch(basketSlice.actions.basketFetchingError('Error' + e)));
};
export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    setBasket: (state, action) => {
      state.basket = action.payload;
    },
    basketFetching(state) {
      state.isBasketLoading = true;
      state.basketError = '';
      state.basketMessage = '';
    },
    basketFetchingSuccess(state, action) {
      state.isBasketLoading = false;
      state.basketError = '';
      state.basket = action.payload;
    },
    basketFetchingError(state, action) {
      state.isBasketLoading = false;
      state.basketMessage = '';
      state.basketError = action.payload;
    },
    basketFetchMessage(state, action) {
      state.basketMessage = action.payload;
    },
  },
});

export const { setBasket, basketFetching, basketFetchingSuccess, basketFetchingError, basketFetchMessage } =
  basketSlice.actions;
export default basketSlice.reducer;
