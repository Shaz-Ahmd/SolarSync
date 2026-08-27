import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import panelService from "../../services/panelService";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchPanelsBySite = createAsyncThunk(
  "panels/fetchPanelsBySite",
  async (siteId, { rejectWithValue }) => {
    try {
      const response = await panelService.getBySite(siteId);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const createPanel = createAsyncThunk(
  "panels/createPanel",
  async (panelData, { rejectWithValue }) => {
    try {
      const response = await panelService.createPanel(panelData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const updatePanel = createAsyncThunk(
  "panels/updatePanel",
  async ({ id, panelData }, { rejectWithValue }) => {
    try {
      const response = await panelService.updatePanel(
        id,
        panelData
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const deletePanel = createAsyncThunk(
  "panels/deletePanel",
  async (id, { rejectWithValue }) => {
    try {
      await panelService.deletePanel(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const panelSlice = createSlice({
  name: "panels",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchPanelsBySite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPanelsBySite.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchPanelsBySite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createPanel.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      .addCase(createPanel.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(updatePanel.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })

      .addCase(updatePanel.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(deletePanel.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload
        );
      })

      .addCase(deletePanel.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default panelSlice.reducer;