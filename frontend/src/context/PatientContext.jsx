import React, {useEffect, useReducer, useCallback} from 'react'
import axios from 'axios';

const initialState = {
  patientList: [],
  searchPatientResult: [],
  loadingList: true
};

const patientReducer = (state, action) => {
    switch (action.type) {
      case "GET_SEARCHRESULT":
        return {...state, searchPatientResult: [...action.myList]}

      case "GET_PATIENTLIST":
        return {...state, patientList: [...action.myList]}
      
      case "LOADING_SPINNER":
        return {...state, loadingList: false}
      
      default:
        return state;
    }
  };

export const MyContext = React.createContext()

export default function PatientContext({children}) {

  const [state, dispatch] = useReducer(patientReducer, initialState);

  const getData = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/patients");
      dispatch({
        type: "GET_PATIENTLIST",
        myList: response.data.patients,
      });
      dispatch({ type: "LOADING_SPINNER" });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const getPatientsResult = useCallback ( (res) => {
    dispatch({
      type: "GET_SEARCHRESULT",
      myList: res.data.message ? [] : res.data,
    });
  }
  , [])

  useEffect(() => {
    getData();
  }, [getData]);


    return (
        <>
          <MyContext.Provider value={{...state,getPatientsResult, getData}}>
            {children}           
          </MyContext.Provider>
        </>
    )
}

// export const usePatientContext = () => {
//     return useContext(MyContext)
//   }