// src/store/marketsSlice.ts

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { dydxApi } from '../../api/dydxClient';

interface MarketsState {
  entities: { [key: string]: any };
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MarketsState = {
  entities: {},
  loading: 'idle',
  error: null,
};

export const fetchMarkets = createAsyncThunk<{ [key: string]: any }>(
  'markets/fetchMarkets',
  async () => {
    const response = await dydxApi.getMarkets();
    return response;
  }
);

const marketsSlice = createSlice({
  name: 'markets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMarkets.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMarkets.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.entities = action.payload;
      })
      .addCase(fetchMarkets.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export default marketsSlice.reducer;