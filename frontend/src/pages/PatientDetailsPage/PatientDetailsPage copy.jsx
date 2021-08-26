import React, {useContext, useReducer, useEffect, useState} from "react";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'; 
import axios from 'axios';

import {MyContext} from '../../context/PatientContext'
import InputReducer from '../../components/InputHandler/InputHandler'
import logo from '../../Assets/logo.png'
import Button from '../../components/Button/Button'
import { RiArrowGoBackFill } from 'react-icons/ri';
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa'; 

import './PatientDetailsPage.css'

const initialState = {
    diseases: [],
    drugs: [],
    prevsurgeries: [],
    alergies: [],
    myInput: ''
}
 
  const myReducer = (state, action) => {
    switch (action.type) {
      case "INPUT_CHANGE":
        return {...state, [action.inputId]: action.value}
      case "ADD_ITEM":
        return {...state, [action.myCategory]: [...state[action.myCategory], {ctgy: action.myCategory, value: state.myInput}] }
      case "REMOVE_ITEM":
        return {...state, [action.myCategory]: state[action.myCategory].filter(item => item.id !== action.id) }
      default:
        return state;
    }
  };

export default function DetailsSection() {
    let history = useHistory();
    const [patientData, setPatientData] = useState()
    const {inputHandler, handleFormSubmit, reduceNoise} = useContext(MyContext)
    const [MyState, dispatch] = useReducer(myReducer, initialState)
    const [loading, setLoading] = useState(false)
    let { id } = useParams();
    // console.log(soso.hasOwnProperty('empName'))
    // console.log(Object.keys(soso))
    // console.log(Object.values(soso))
    // console.log(MyState);

    // The nullish coalescing operator (??) is a logical operator that returns its right-hand side operand 
    // when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.

    const changeHandler = (e) => {
        dispatch({ 
            type: "INPUT_CHANGE", 
            inputId: e.target.id,
            value: e.target.value, 
        })
    }
    
    const addHandler = (myCategory) => {
        dispatch({ 
            type: "ADD_ITEM", 
            myCategory,
            myId: uuidv4()
        })
    }

    const removeHandler = (id, ctgy) => {
        dispatch({
            type: "REMOVE_ITEM", 
            myCategory: ctgy,
            id
        })
    }

    useEffect(() => {
        setLoading(true)
        const fetchPatientData = async (id) => {
          try {
            const response = await axios.get(`http://localhost:5000/patient/${id}`);
            if (response.statusText === "OK") {
                setPatientData(response.data.patient)
            }
            console.log(response.data.patient);
          } catch (e) {
            console.log(e);
          }
          setLoading(false)
        };
        fetchPatientData(id)
    }, [id])

    return (
      <>
        <img width="220px" src={logo} alt="fds" />
        {!loading && patientData ? <form  onSubmit={handleFormSubmit}>
            <section className="patient__list__details__container">
                
                <div className="patient__list__details__left__wrapper">
                    <div className="left_wrapper">
                        <div className="patient__list__header__chronic">ملاحظات</div>
                        <InputReducer
                            classname="text-area-style"
                            id="notes"
                            name="patientNotes"
                            type="text"
                            element="textarea"
                            onInput={inputHandler}
                        />  
                        <Button onClick={() => reduceNoise(MyState)} color={"#DCDCDC"} size="big" textColor="black" type="submit">Save <FaEdit size="25"/></Button>  
                        <Button onClick={() => history.push("/")} color={"#000000"} size="small" textColor="white"><RiArrowGoBackFill size="22"/> الرجوع </Button>  
                    </div>
                </div>
                
                <div className="patient__list__details__right__wrapper">

                    <div className="patient__list__personal__details__wrapper">
                        <div className="patient__list__header">بيانات المريض</div>
                        <div className="patient_personal_details_input">
                            <InputReducer
                                classname="formControl-category"
                                id="job"
                                label="المهنة"
                                name="patientDetails"
                                type="text"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.job}
                            />             
                            <InputReducer
                                classname="formControl-category"
                                id="age"
                                label="السن"
                                name="patientDetails"
                                type="text"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.age}
                            />
                            <InputReducer
                                classname="formControl-category"
                                id="title"
                                label="اسم المريض"
                                name="patientDetails"
                                type="text"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.patientName}
                            />
                            <InputReducer
                                classname="formControl-category"
                                id="birthDate"
                                label="تاريخ الميلاد"
                                name="patientDetails"
                                type="text"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.birthDate}
                            />
                            <InputReducer
                                classname="formControl-category"
                                id="insurance"
                                label="التامين"
                                name="patientDetails"
                                type="checkbox"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.insurance}
                            />
                        </div>
                    </div>

                    <div className="patient__list__vital__modifiers__wrapper">
                        <div className="patient__list__header">المعدلات الحيوية</div>
                        <div className="patient_vital_modifiers_input">
                            <InputReducer
                                classname="formControl-category"
                                id="bloodtype"
                                label="فصيلة الدم"
                                name="vitalmodifiers"
                                type="text"
                                element="select"
                                onInput={inputHandler}
                                initialValue={patientData.vitalmodifiers.bloodtype}
                            >
                                <option>A+</option>
                                <option>A-</option>
                                <option>B+</option>
                                <option>B-</option>
                                <option>O+</option>
                                <option>O-</option>
                                <option>AB+</option>
                                <option>AB-</option>
                            </InputReducer>      
                            <InputReducer
                                classname="formControl-category"
                                id="heartrate"
                                label="معدل النبض"
                                name="vitalmodifiers"
                                type="text"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.vitalmodifiers.heartrate}
                            />
                            <InputReducer
                                classname="formControl-category"
                                id="breathing"
                                label="التنفس"
                                name="vitalmodifiers"
                                type="text"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.vitalmodifiers.breathing}
                            />  
                            <InputReducer
                                classname="formControl-category"
                                id="weight"
                                label="الوزن"
                                name="vitalmodifiers"
                                type="text"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.vitalmodifiers.weight}
                            />  
                        </div>
                    </div>

                    <div className="patient__list__usual__habits__wrapper">
                        <div className="patient__list__header">العادات المنتظمة</div>
                        <div className="patient_usual_habits_input">
                            <InputReducer
                                classname="formControl-category"
                                id="duringwork"
                                label="المجهود خلال العمل"
                                name="usualhabits"
                                type="text"
                                element="select"
                                onInput={inputHandler}
                                initialValue={patientData.usualhabits.duringwork}
                            >
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </InputReducer> 
                            <InputReducer
                                classname="formControl-category"
                                id="smoke"
                                label="يدخن"
                                name="usualhabits"
                                type="checkbox"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.usualhabits.smoke}
                            /> 
                            <InputReducer
                                classname="formControl-category"
                                id="eatfruits"
                                label="ياكل الفواكهة"
                                name="usualhabits"
                                type="checkbox"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.usualhabits.eatfruits}
                            /> 
                            <InputReducer
                                classname="formControl-category"
                                id="duringmobility"
                                label="المجهود خلال التنقل"
                                name="usualhabits"
                                type="text"
                                element="select"
                                onInput={inputHandler}
                                initialValue={patientData.usualhabits.workout}
                            >   
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </InputReducer>
                            <InputReducer
                                classname="formControl-category"
                                id="alcohol"
                                label="يشرب الكحوليات"
                                name="usualhabits"
                                type="checkbox"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.usualhabits.alcohol}
                            /> 
                            <InputReducer
                                classname="formControl-category"
                                id="eatvegetables"
                                label="ياكل الخضروات"
                                name="usualhabits"
                                type="checkbox"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.usualhabits.eatvegetables}
                            /> 
                            <InputReducer
                                classname="formControl-category"
                                id="duringholidays"
                                label="المجهود خلال العطلات"
                                name="usualhabits"
                                type="text"
                                element="select"
                                onInput={inputHandler}
                                initialValue={patientData.usualhabits.duringholidays}
                            >
                                <option>High</option>
                                <option>Medium</option>
                                <option>Low</option>
                            </InputReducer>
                            <InputReducer
                                classname="formControl-category"
                                id="workout"
                                label="يمارس الرياضة"
                                name="usualhabits"
                                type="checkbox"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.usualhabits.workout}
                            /> 
                            <InputReducer
                                classname="formControl-category"
                                id="eatmeat"
                                label="ياكل اللحوم"
                                name="usualhabits"
                                type="checkbox"
                                element="input"
                                onInput={inputHandler}
                                initialValue={patientData.usualhabits.eatmeat}
                            />             
                        </div>
                    </div>

                    <div className="patient__list__chronic__diseases__wrapper">

                        <div className="patient_chronic_diseases_input">          
                            <div className="patient__list__header__chronic">الجراحات السابقة</div>
                            <div className="input__section__wrapper">
                                <div className="input__section">
                                    <input name="prevsurgeries" placeholder="...اضف هنا" id="myInput" onChange={changeHandler} type="text"/>
                                    <button onClick={() => addHandler('prevsurgeries')}>Add</button>
                                </div>
                                <ItemsList items={MyState.prevsurgeries} removeHandler={removeHandler}/>
                            </div>
                        </div>
                        <div className="patient_chronic_diseases_input">
                            <div className="patient__list__header__chronic">الامراض المزمنة</div>
                            <div className="input__section__wrapper">
                                <div className="input__section">
                                    <input name="diseases" placeholder="...اضف هنا" id="myInput" onChange={changeHandler} type="text"/>
                                    <button onClick={() => addHandler('diseases')}>Add</button>
                                </div>
                                <ItemsList items={MyState.diseases} removeHandler={removeHandler}/>
                            </div>
                        </div>
                        <div className="patient_chronic_diseases_input">
                            <div className="patient__list__header__chronic">الحساسية (دواء - طعام - مادة)</div>
                            <div className="input__section__wrapper">
                                <div className="input__section">
                                    <input name="alergies" placeholder="...اضف هنا" id="myInput" onChange={changeHandler} type="text"/>
                                    <button onClick={() => addHandler('alergies')}>Add</button>
                                </div>
                                <ItemsList items={MyState.alergies} removeHandler={removeHandler}/>
                            </div>
                        </div>
                        <div className="patient_chronic_diseases_input">
                            <div className="patient__list__header__chronic">الادوية الحالية و التطعيمات</div>
                            <div className="input__section__wrapper">
                                <div className="input__section">
                                    <input name="drugs" placeholder="...اضف هنا" id="myInput" onChange={changeHandler} type="text"/>
                                    <button onClick={() => addHandler('drugs')}>Add</button>
                                </div>
                                <ItemsList items={MyState.drugs} removeHandler={removeHandler}/>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </form> : <h1>still loading patient's data</h1>}
      </>
    );
}

function ItemsList({items, removeHandler}) {
    return (
      <div>
        {items.map((item, index) => {
          return (
            <div className="item_list_wrapper" key={index}>
              <span>{`#1 ${item.value}`}</span> 
              <button onClick={() => removeHandler(item.id, item.ctgy)}><FaTrashAlt className="icon-trash-style" size={16}/></button>
            </div>
          );
        })}
      </div>
    );
  }
