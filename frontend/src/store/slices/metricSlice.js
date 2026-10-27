import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import metricService from "../../services/metricService";

const initialState = {
  recent: [],
  analytics: null,
  loading: false,
  error: null,
  success: false,
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
      const response = await metricService.ingestBatch(batchData);
      return response.data;
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

  reducers: {
    clearMetricStatus: (state) => {
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch recent metrics
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

      // Fetch analytics
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

      // Simulate generation
      .addCase(ingestMockMetrics.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(ingestMockMetrics.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })

      .addCase(ingestMockMetrics.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { clearMetricStatus } = metricSlice.actions;

export default metricSlice.reducer;