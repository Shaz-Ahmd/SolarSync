import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/authService";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: storedUser,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      return await authService.login(userData);
    } catch (error) {
      return rejectWithValue(
        error.response?.data || error.message
      );
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    authService.logout();
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    reset: (state) => {
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;