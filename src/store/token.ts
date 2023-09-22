import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchToken = createAsyncThunk('token/fetchToken', async () => {
  return fetch(`https://auth.${process.env.VITE_CTP_API_REGION}.commercetools.com/oauth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${process.env.VITE_CTP_CLIENT_ID}:${process.env.VITE_CTP_CLIENT_SECRET}`),
    },
    body: `grant_type=client_credentials&scope=manage_project:${process.env.VITE_CTP_PROJECT_KEY}`,
  }).then((res) => res.json());
});

const initialState = {
  token: null,
  tokenFetchMessage: '',
  isTokenLoading: false,
};

export const tokenSLice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.isTokenLoading = true;
      })
      .addCase(fetchToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isTokenLoading = false;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.tokenFetchMessage = `Fetch rejected: ${action.payload}`;
        state.isTokenLoading = false;
      });
  },
});

export const { setToken } = tokenSLice.actions;
export default tokenSLice.reducer;
