import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import siteReducer from "./slices/siteSlice";
import panelReducer from "./slices/panelSlice";
import ticketReducer from "./slices/ticketSlice";
import metricReducer from "./slices/metricSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    sites: siteReducer,
    panels: panelReducer,
    tickets: ticketReducer,
    metrics: metricReducer,
  },
});

export default store;