import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import metricService from "../../services/metricService";

const initialState = {
  recent: [],
  analytics: null,
  loading: false,
  error: null,
};

export const fetchRecentMetrics = createAsyncThunk(
  "metrics/fetchRecentMetrics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await metricService.getRecent();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const fetchAnalytics = createAsyncThunk(
  "metrics/fetchAnalytics",
  async (_, { rejectWithValue }) => {
    try {
      const response = await metricService.getEfficiencyReport();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const ingestMockMetrics = createAsyncThunk(
  "metrics/ingestMockMetrics",
  async (batchData, { rejectWithValue }) => {
    try {
      await metricService.ingestBatch(batchData);
      return true;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const metricSlice = createSlice({
  name: "metrics",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchRecentMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRecentMetrics.fulfilled, (state, action) => {
        state.loading = false;
        state.recent = action.payload;
      })

      .addCase(fetchRecentMetrics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchAnalytics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAnalytics.fulfilled, (state, action) => {
        state.loading = false;
        state.analytics = action.payload;
      })

      .addCase(fetchAnalytics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(ingestMockMetrics.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default metricSlice.reducer;