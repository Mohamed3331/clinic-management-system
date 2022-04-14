// ============================================================================================

//                   NOTE: LEGACY CODE
// This file contains legacy code of react context, I updated it by
// USing Redux Toolkit as the main state management for this App.
// I only kept this file and the ./PatientContext.jsx file
// Just for Illustration.

// ============================================================================================

// import React, {useEffect, useReducer, useCallback} from 'react'
// import axios from 'axios';

// const initialState = {
//   registeredPatients: [],
//   loadingList: true
// };

// const RegisteredPatientsReducer = (state, action) => {
//   switch (action.type) {
//     case "GET_REGISTEREDPATIENTS":
//       return { ...state, registeredPatients: [...action.myList] };
//     default:
//       return state;
//   }
// };

// export const MyRegisteredPatientsContext = React.createContext()

// export default function RegisteredPatientsContext({children}) {

//   const [state, dispatch] = useReducer(RegisteredPatientsReducer, initialState);

//   const getRegisteredPatients = useCallback(async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/registerd/patients`);
//       if (response.statusText === "OK") {
//         dispatch({
//           type: "GET_REGISTEREDPATIENTS",
//           myList: response.data.patients,
//         });
//       }
//     } catch (e) {
//       console.log(e);
//     }
//   }, []);

//   useEffect(() => {
//     getRegisteredPatients()
//   }, [getRegisteredPatients]);

//     return (
//         <>
//             <MyRegisteredPatientsContext.Provider value={{...state, getRegisteredPatients}}>
//                 {children}
//             </MyRegisteredPatientsContext.Provider>
//         </>
//     )
// }
