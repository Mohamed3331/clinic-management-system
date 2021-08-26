import React, {useEffect, useReducer, useCallback} from 'react'
import axios from 'axios';

const initialState = {
  registeredPatients: [],
  loadingList: true
};

const RegisteredPatientsReducer = (state, action) => {
    switch (action.type) {
      case "GET_REGISTEREDPATIENTS":
        return {...state, registeredPatients: [...action.myList]}
      
      case "LOADING_SPINNER":
        return {...state, loadingList: false}
      
      default:
        return state;
    }
  };

export const MyRegisteredPatientsContext = React.createContext()

export default function RegisteredPatientsContext({children}) {

  const [state, dispatch] = useReducer(RegisteredPatientsReducer, initialState);

  const getRegisteredPatients = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:5000/registerd/patients");
      if (response.statusText === "OK") {
        dispatch({
          type: "GET_REGISTEREDPATIENTS",
          myList: response.data.patients,
        });
      }
      // dispatch({ type: "LOADING_SPINNER" });
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    getRegisteredPatients()
  }, [getRegisteredPatients]);

    return (
        <>
            <MyRegisteredPatientsContext.Provider value={{...state, getRegisteredPatients}}>
                {children}           
            </MyRegisteredPatientsContext.Provider>
        </>
    )
}