import React, { useState, useReducer } from "react";
import './InputHandler.css'

const newInputReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      if (action.checkbox === "checkbox" || action.checkbox === "radio") {
        return {...state, inputs: {...state.inputs, [action.category]: {...state.inputs[action.category], [action.inputId]: action.checked} } }
      } else {
        return {...state, inputs: {...state.inputs, [action.category]: {...state.inputs[action.category], [action.inputId]: action.value} } }
      }
    default:
      return state;
  }
};

const InputReducer = (props) => {
  const [state, dispatch] = useReducer(newInputReducer, {
    inputs: {
      patientDetails: {
        name: 'fd',
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
    }
  });

  const [myValue, setMyValue] = useState('')
  const [myChecked, setChecked] = useState('')
  const {id, onInput} = props

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

  const changeHandler = (e) => {
    setMyValue(e.target.value)
    if (e.target.type === 'checkbox') {
      setChecked(e.target.checked)
    }
    onInput(id, e.target.value, e.target.name, e.target.type, e.target.checked);
  };
  
  let element
  if (props.element === "input") {
    element = (
      <input
        id={props.id}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={myValue}
        // checked={myChecked || props.initialValue === true ? true : '' }
      />
    )
  } else if (props.element === "textarea") {
    element = (
      <textarea
        id={props.id}
        name={props.name}
        type={props.type}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={props.initialValue || myValue}
      />
    )
  } else if (props.element === "select") {
    element = (
      <select  id={props.id} name={props.name} onChange={changeHandler} value={myValue || props.initialValue}>
        {props.children.map((opt, index) => (
          <option key={index} value={opt.props.children}>{opt.props.children}</option>
        ))}
      </select>
    )
  } else {
    return ("Input an element Please")
  }
  return (
      <div className={`form-control ${props.classname}`}>
        <label htmlFor={props.id}>{props.label}</label>
        {element}
    </div>
  );
};

export default InputReducer;
