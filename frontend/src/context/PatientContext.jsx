import React, {useEffect, useReducer, useCallback} from 'react'
import axios from 'axios';

const initialState = {
  inputs: {
    patientDetails: {
        name: "",
        age: "",
        job: "",
        birthDate: "",
        insurance: "",
        phoneNumber: ""
    },
    vitalmodifiers: {
        bloodpressure: "",
        breathing: "",
        heartrate: "",
        bloodtype: "",
        weight: "",
    },
    usualhabits: {
        eatfruits: "",
        eatvegetables: "",
        eatmeat: "",
        smoke: "",
        alcohol: "",
        workout: "",
        duringwork: "",
        duringmobility: "",
        duringholidays: "",
    },
    patientNotes: {
        notes: "",
    },
  },
  patientList: [],
  searchPatientResult: [],
  loadingList: true
};

const newInputReducer = (state, action) => {
    switch (action.type) {
      case "INPUT_CHANGE":
        if (action.checkbox === "checkbox" || action.checkbox === "radio") {
          return {...state, inputs: {...state.inputs, [action.category]: {...state.inputs[action.category], [action.inputId]: action.checked} } }
        } else {
          return {...state, inputs: {...state.inputs, [action.category]: {...state.inputs[action.category], [action.inputId]: action.value} } }
        }
      case "REDUCEDATA_NOISE":
        return {...state, inputs: {...state.inputs, ...action.restofState}}

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

  const [state, dispatch] = useReducer(newInputReducer, initialState);

  const inputHandler = (id, value, name, type, checked) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      inputId: id,
      category: name,
      checkbox: type,
      checked,
    });
  };

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

  const getPatientsResult = (res) => {
    dispatch({
      type: "GET_SEARCHRESULT",
      myList: res.data.message ? [] : res.data,
    });
  }
  
  
  useEffect(() => {
    getData();
  }, [getData]);

  const reduceNoise = (myState = {}) => {
    delete myState.prevSurgValue;
    delete myState.chronicValue;
    delete myState.allergValue;
    delete myState.drugValue;
    dispatch({
      type: "REDUCEDATA_NOISE",
      restofState: myState,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(state.inputs);
  };  

    return (
        <>
            <MyContext.Provider value={{...state, getData, getPatientsResult, inputHandler, reduceNoise, handleFormSubmit}}>
                {children}           
            </MyContext.Provider>
        </>
    )
}

// export const usePatientContext = () => {
//     return useContext(MyContext)
//   }