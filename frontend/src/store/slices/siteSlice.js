import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import siteService from "../../services/sitesService";

const initialState = {
  items: [],
  selectedItem: null,
  loading: false,
  error: null,
  searchQuery: "",
};

export const fetchSites = createAsyncThunk(
  "sites/fetchSites",
  async (_, { rejectWithValue }) => {
    try {
      const response = await siteService.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const fetchSiteById = createAsyncThunk(
  "sites/fetchSiteById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await siteService.getById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const createSite = createAsyncThunk(
  "sites/createSite",
  async (siteData, { rejectWithValue }) => {
    try {
      const response = await siteService.create(siteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

const siteSlice = createSlice({
  name: "sites",

  initialState,

  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder

      // FETCH ALL SITES
      .addCase(fetchSites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSites.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })

      .addCase(fetchSites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // FETCH ONE SITE
      .addCase(fetchSiteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchSiteById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedItem = action.payload;
      })

      .addCase(fetchSiteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // CREATE SITE
      .addCase(createSite.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(createSite.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })

      .addCase(createSite.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchQuery } = siteSlice.actions;

export default siteSlice.reducer;