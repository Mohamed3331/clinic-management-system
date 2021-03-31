import React, {useEffect, useReducer} from 'react'

const newInputReducer = (state, action) => {
    switch (action.type) {
      case "INPUT_CHANGE":
        if (action.checkbox === "checkbox" || action.checkbox === "radio") {
          return {...state, inputs: {...state.inputs, [action.category]: {...state.inputs[action.category], [action.inputId]: {value: action.checked}} } }
        } else {
          return {...state, inputs: {...state.inputs, [action.category]: {...state.inputs[action.category], [action.inputId]: {value: action.value}} } }
        }
      default:
        return state;
    }
  };

export const MyContext = React.createContext()

export default function PatientContext({children}) {

    const initialState = {
      inputs: {
        patientDetails: {
          title: { value: "" },
          age: { value: "" },
          job: { value: "" },
          birthDate: { value: "" },
          insurance: { value: "" },
        },
        vitalmodifiers: {
          bloodpressure: { value: "" },
          breathing: {value: ""},
          heartrate: {value: ""},
          bloodtype: { value: "" },
          thigh: { value: "" },
          wrist: { value: "" },
          weight: { value: "" },
          height: { value: "" },
        },
        usualhabits: {
          eatfruits: { value: "" },
          eatvegetables: {value: ""},
          eatmeat: {value: ""},
          smoke: { value: "" },
          alcohol: { value: "" },
          workout: { value: "" },
          duringwork: { value: "" },
          duringmobility: { value: "" },
          duringholidays: { value: "" },
        },
      },
    };

    const [state, dispatch] = useReducer(newInputReducer, initialState);
    console.log(state);

    const inputHandler = (id, value, name, type, checked) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        inputId: id,
        category: name,
        checkbox: type, 
        checked
      });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // const formData = new FormData();
        // formData.append('inputs', state.inputs.patientDetails.title);
        // const data = Object.fromEntries(formData.entries())
        console.log('fdsfsd');
    }  

    return (
        <>
            <MyContext.Provider value={{...state, inputHandler, handleSubmit}}>
                {children}           
            </MyContext.Provider>
        </>
    )
}

// export const usePatientContext = () => {
//     return useContext(MyContext)
//   }