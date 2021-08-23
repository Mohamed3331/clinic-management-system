import React, { useState } from "react";
import './InputHandler.css'

const InputReducer = (props) => {
  const [myValue, setMyValue] = useState('fdsfsdfsd')
  const [myChecked, setChecked] = useState('')
  const {id, onInput} = props

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
        checked={myChecked || props.initialValue === true ? true : '' }
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
