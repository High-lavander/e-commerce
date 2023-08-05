import { http } from '../api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  products: [],
  status: 'idle',
};
export const fetchProducts = createAsyncThunk(
  'recipes/fetchProducts',
  async (query: { url: string; options: unknown }) => {
    const response = await http.get(query.url, { params: query.options });
    return response.data.hits;
  }
);

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
