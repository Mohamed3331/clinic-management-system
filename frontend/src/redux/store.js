import { configureStore } from "@reduxjs/toolkit";
import patientsListReducer from "./patientsSlice";
import registeredPatientsListReducer from "./registeredPatientsSlice";
import filteredPatientsReducer from "./filteredPatientsSlice";
import adminSlice from "./adminSlice";
// import logger from 'redux-logger'

// const rootReducer = {
//   patients: patientListReducer,
// }

export const store = configureStore({
  reducer: {
    patients: patientsListReducer,
    registeredPatients: registeredPatientsListReducer,
    filteredPatients: filteredPatientsReducer,
    authToken: adminSlice,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

// console.log(store.getState());
