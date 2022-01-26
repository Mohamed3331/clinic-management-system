// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
//                   NOTE: LEGACY CODE
// This file contains legacy code of react context, I updated it by
// USing Redux Toolkit as the main state management for this App.
// I only kept this file and the ./RegisteredPatientContext.jsx file
// Just for Illustration.

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

// import React, {useEffect, useReducer, useCallback} from 'react'
// import axios from 'axios';

// const initialState = {
//   patientList: [],
//   searchPatientResult: [],
//   loadingList: true
// };

// const patientReducer = (state, action) => {
//     switch (action.type) {
//       case "GET_SEARCHRESULT":
//         return {...state, searchPatientResult: [...action.myList]}

//       case "GET_PATIENTLIST":
//         return {...state, patientList: [...action.myList]}

//       default:
//         return state;
//     }
//   };

// export const MyContext = React.createContext()

// export default function PatientContext({children}) {

//   const [state, dispatch] = useReducer(patientReducer, initialState);

//   const getData = useCallback(async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/patients`);
//       dispatch({
//         type: "GET_PATIENTLIST",
//         myList: response.data.patients,
//       });
//     } catch (e) {
//       console.log(e);
//     }
//   }, []);

//   const getPatientsResult = useCallback ( (res) => {
//     dispatch({
//       type: "GET_SEARCHRESULT",
//       myList: res.data.message ? [] : res.data,
//     });
//   }
//   , [])

//   useEffect(() => {
//     getData();
//   }, [getData]);

//     return (
//         <>
//           <MyContext.Provider value={{...state,getPatientsResult, getData}}>
//             {children}
//           </MyContext.Provider>
//         </>
//     )
// }
