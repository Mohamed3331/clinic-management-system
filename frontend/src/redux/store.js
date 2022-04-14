import { configureStore } from "@reduxjs/toolkit";
import patientsListReducer from "./patientsSlice";
import registeredPatientsListReducer from "./registeredPatientsSlice";
import filteredPatientsReducer from "./filteredPatientsSlice";
import authReducer from "./authSlice";


const token = localStorage.getItem("adminToken") ? localStorage.getItem("adminToken") : ""

export const store = configureStore({
  reducer: {
    patients: patientsListReducer,
    registeredPatients: registeredPatientsListReducer,
    filteredPatients: filteredPatientsReducer,
    authToken: authReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
  preloadedState: { authToken: { token, error: "" } }
});

