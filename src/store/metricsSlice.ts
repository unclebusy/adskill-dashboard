import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MetricsState } from '../types/types';
import { mockMetrics } from '../data/mockData';

const initialState: MetricsState = {
  expense: 0,
  expenseChange: 0,
  clicks: 0,
  clicksChange: 0,
  cpc: 0,
  cpcChange: 0,
  cpa: 0,
  cpaChange: 0,
};

export const fetchMetrics = createAsyncThunk<MetricsState, void, { rejectValue: string }>(
  'metrics/fetchMetrics',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockMetrics;
    } catch {
      return rejectWithValue('Не удалось загрузить метрики');
    }
  }
);

const metricsSlice = createSlice({
  name: 'metrics',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMetrics.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default metricsSlice.reducer;
