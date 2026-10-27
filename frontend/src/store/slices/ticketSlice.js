import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import ticketService from "../../services/ticketService";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

/*
 * FETCH ALL TICKETS
 */
export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",

  async (_, { rejectWithValue }) => {

    try {

      const response =
        await ticketService.getAll();

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data ||
        error.message
      );
    }
  }
);

/*
 * REPORT TICKET
 */
export const reportTicket = createAsyncThunk(
  "tickets/reportTicket",

  async (
    ticketData,
    { rejectWithValue }
  ) => {

    try {

      const response =
        await ticketService.create(
          ticketData
        );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data ||
        error.message
      );
    }
  }
);

/*
 * START WORK
 */
export const startWork = createAsyncThunk(
  "tickets/startWork",

  async (
    ticketId,
    { rejectWithValue }
  ) => {

    try {

      const response =
        await ticketService.startWork(
          ticketId
        );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data ||
        error.message
      );
    }
  }
);

/*
 * RESOLVE TICKET
 */
export const resolveTicket = createAsyncThunk(
  "tickets/resolveTicket",

  async (
    ticketId,
    { rejectWithValue }
  ) => {

    try {

      const response =
        await ticketService.resolve(
          ticketId
        );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data ||
        error.message
      );
    }
  }
);

/*
 * ASSIGN TECHNICIAN
 */
export const assignTicket = createAsyncThunk(
  "tickets/assignTicket",

  async (
    { ticketId, technicianId },
    { rejectWithValue }
  ) => {

    try {

      const response =
        await ticketService.assign(
          ticketId,
          technicianId
        );

      return response.data;

    } catch (error) {

      return rejectWithValue(
        error.response?.data ||
        error.message
      );
    }
  }
);

const ticketSlice = createSlice({

  name: "tickets",

  initialState,

  reducers: {

    clearError: (state) => {
      state.error = null;
    },

  },

  extraReducers: (builder) => {

    builder

      /*
       * FETCH
       */
      .addCase(
        fetchTickets.pending,
        (state) => {

          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchTickets.fulfilled,
        (state, action) => {

          state.loading = false;
          state.items =
            Array.isArray(action.payload)
              ? action.payload
              : [];
        }
      )

      .addCase(
        fetchTickets.rejected,
        (state, action) => {

          state.loading = false;
          state.error =
            action.payload;
        }
      )

      /*
       * REPORT
       */
      .addCase(
        reportTicket.pending,
        (state) => {

          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        reportTicket.fulfilled,
        (state, action) => {

          state.loading = false;

          state.items.unshift(
            action.payload
          );
        }
      )

      .addCase(
        reportTicket.rejected,
        (state, action) => {

          state.loading = false;
          state.error =
            action.payload;
        }
      )

      /*
       * START WORK
       */
      .addCase(
        startWork.pending,
        (state) => {

          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        startWork.fulfilled,
        (state, action) => {

          state.loading = false;

          const index =
            state.items.findIndex(
              (item) =>
                item.id ===
                action.payload.id
            );

          if (index !== -1) {

            state.items[index] =
              action.payload;
          }
        }
      )

      .addCase(
        startWork.rejected,
        (state, action) => {

          state.loading = false;
          state.error =
            action.payload;
        }
      )

      /*
       * RESOLVE
       */
      .addCase(
        resolveTicket.pending,
        (state) => {

          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        resolveTicket.fulfilled,
        (state, action) => {

          state.loading = false;

          const index =
            state.items.findIndex(
              (item) =>
                item.id ===
                action.payload.id
            );

          if (index !== -1) {

            state.items[index] =
              action.payload;
          }
        }
      )

      .addCase(
        resolveTicket.rejected,
        (state, action) => {

          state.loading = false;
          state.error =
            action.payload;
        }
      )

      /*
       * ASSIGN
       */
      .addCase(
        assignTicket.pending,
        (state) => {

          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        assignTicket.fulfilled,
        (state, action) => {

          state.loading = false;

          const index =
            state.items.findIndex(
              (item) =>
                item.id ===
                action.payload.id
            );

          if (index !== -1) {

            state.items[index] =
              action.payload;
          }
        }
      )

      .addCase(
        assignTicket.rejected,
        (state, action) => {

          state.loading = false;
          state.error =
            action.payload;
        }
      );
  },
});

export const {
  clearError,
} = ticketSlice.actions;

export default ticketSlice.reducer;