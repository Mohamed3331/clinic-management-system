import React, {useContext, useState, useReducer} from "react";
import {MyContext} from '../../context/PatientContext'
import InputReducer from '../../components/InputHandler/InputHandler'
import logo from '../../Assets/logo.png'
import { FaTrashAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';  

import styles from './PatientDetailsPage.css'

const initialState = {
    diseases: [],
    drugs: [],
    prevsurgeries: [],
    alergies: [],
    fofo: {value: ''},
    koko: {value: ''},
    lolo: {value: ''},
    toto: {value: ''}
}
  
  const myReducer = (state, action) => {
    switch (action.type) {
      case "INPUT_CHANGE":
        return {...state, [action.inputId]: {value: action.value}}
      case "ADD_ITEM":
        return {...state, [action.myCategory]: [...state[action.myCategory], {id: action.myId, ctgy: action.myCategory, value: action.value}] }
      case "REMOVE_ITEM":
        return {...state, [action.myCategory]: state[action.myCategory].filter(item => item.id !== action.id) }
      default:
        return state; 
    }
  };

export default function DetailsSection() {
    const {inputHandler} = useContext(MyContext)

    const [state, dispatch] = useReducer(myReducer, initialState)
    const [myfuckingID, setId] = useState('')
    const [category, setCategory] = useState()

    console.log(state);

    const changeHandler = (e) => {
        dispatch({ 
        type: "INPUT_CHANGE", 
        inputId: e.target.id,
        value: e.target.value, 
        })
        setId(e.target.id)
        setCategory(e.target.name)
    }
    
    const addHandler = () => {
        dispatch({ 
        type: "ADD_ITEM", 
        value: state[myfuckingID].value,
        myCategory: category,
        myId: uuidv4()
        })
        state[myfuckingID].value = ''
    }

    const removeHandler = (id, ctgy) => {
        dispatch({
        type: "REMOVE_ITEM", 
        myCategory: ctgy,
        id
        })
    }

    return (
      <>
        <img width="220px" src={logo} alt="fds" />
        <section className="patient__list__details__container">
            <div className="patient__list__details__left__wrapper">left here</div>
            
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
                        />             
                        <InputReducer
                            classname="formControl-category"
                            id="age"
                            label="السن"
                            name="patientDetails"
                            type="text"
                            element="input"
                            onInput={inputHandler}
                        />
                        <InputReducer
                            classname="formControl-category"
                            id="title"
                            label="اسم المريض"
                            name="patientDetails"
                            type="text"
                            element="input"
                            onInput={inputHandler}
                        />
                        <InputReducer
                            classname="formControl-category"
                            id="birthDate"
                            label="تاريخ الميلاد"
                            name="patientDetails"
                            type="text"
                            element="input"
                            onInput={inputHandler}
                        />
                        <InputReducer
                            classname="formControl-category"
                            id="insurance"
                            label="التامين"
                            name="patientDetails"
                            type="checkbox"
                            element="input"
                            onInput={inputHandler}
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
                        />
                        <InputReducer
                            classname="formControl-category"
                            id="breathing"
                            label="التنفس"
                            name="vitalmodifiers"
                            type="text"
                            element="input"
                            onInput={inputHandler}
                        />
                        <InputReducer
                            classname="formControl-category"
                            id="bloodpressure"
                            label="ضغط الدم"
                            name="vitalmodifiers"
                            type="text"
                            element="input"
                            onInput={inputHandler}
                        />
                        <InputReducer
                            classname="formControl-category"
                            id="height"
                            label="الطول"
                            name="vitalmodifiers"
                            type="text"
                            element="input"
                            onInput={inputHandler}
                        />
                        <InputReducer
                            classname="formControl-category"
                            id="weight"
                            label="الوزن"
                            name="vitalmodifiers"
                            type="text"
                            element="input"
                            onInput={inputHandler}
                        />      
                        <InputReducer
                            classname="formControl-category"
                            id="wrist"
                            label="الرسغ"
                            name="vitalmodifiers"
                            type="text"
                            element="input"
                            onInput={inputHandler}
                        /> 
                        <InputReducer
                            classname="formControl-category"
                            id="thigh"
                            label="الورك"
                            name="vitalmodifiers"
                            type="text"
                            element="input"
                            onInput={inputHandler}
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
                        /> 
                        <InputReducer
                            classname="formControl-category"
                            id="eatfruits"
                            label="ياكل الفواكهة"
                            name="usualhabits"
                            type="checkbox"
                            element="input"
                            onInput={inputHandler}
                        /> 
                        <InputReducer
                            classname="formControl-category"
                            id="duringmobility"
                            label="المجهود خلال التنقل"
                            name="usualhabits"
                            type="text"
                            element="select"
                            onInput={inputHandler}
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
                        /> 
                        <InputReducer
                            classname="formControl-category"
                            id="eatvegetables"
                            label="ياكل الخضروات"
                            name="usualhabits"
                            type="checkbox"
                            element="input"
                            onInput={inputHandler}
                        /> 
                        <InputReducer
                            classname="formControl-category"
                            id="duringholidays"
                            label="المجهود خلال العطلات"
                            name="usualhabits"
                            type="text"
                            element="select"
                            onInput={inputHandler}
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
                        /> 
                        <InputReducer
                            classname="formControl-category"
                            id="eatmeat"
                            label="ياكل اللحوم"
                            name="usualhabits"
                            type="checkbox"
                            element="input"
                            onInput={inputHandler}
                        />             
                    </div>
                </div>

                <div className="patient__list__chronic__diseases__wrapper">

                    <div className="patient_chronic_diseases_input">          
                        <div className="patient__list__header__chronic">الجراحات السابقة</div>
                        <div className="input__section__wrapper">
                            <div className="input__section">
                                <input value={myfuckingID && state.fofo.value } name="prevsurgeries" placeholder="...اضف هنا" id="fofo" onChange={changeHandler} type="text"/>
                                <button onClick={addHandler}>Add</button>
                            </div>
                            <ItemsList items={state.prevsurgeries} removeHandler={removeHandler}/>
                        </div>
                    </div>
                    <div className="patient_chronic_diseases_input">
                        <div className="patient__list__header__chronic">الامراض المزمنة</div>
                        <div className="input__section__wrapper">
                            <div className="input__section">
                                <input name="diseases" placeholder="...اضف هنا" id="koko" onChange={changeHandler} type="text"/>
                                <button onClick={addHandler}>Add</button>
                            </div>
                            <ItemsList value={myfuckingID && state.koko.value } items={state.diseases} removeHandler={removeHandler}/>
                        </div>
                    </div>
                    <div className="patient_chronic_diseases_input">
                        <div className="patient__list__header__chronic">الحساسية (دواء - طعام - مادة)</div>
                        <div className="input__section__wrapper">
                            <div className="input__section">
                                <input name="alergies" placeholder="...اضف هنا" id="lolo" onChange={changeHandler} type="text"/>
                                <button onClick={addHandler}>Add</button>
                            </div>
                            <ItemsList value={myfuckingID && state.lolo.value } items={state.alergies} removeHandler={removeHandler}/>
                        </div>
                    </div>
                    <div className="patient_chronic_diseases_input">
                        <div className="patient__list__header__chronic">الادوية الحالية و التطعيمات</div>
                        <div className="input__section__wrapper">
                            <div className="input__section">
                                <input name="drugs" placeholder="...اضف هنا" id="toto" onChange={changeHandler} type="text"/>
                                <button onClick={addHandler}>Add</button>
                            </div>
                            <ItemsList value={myfuckingID && state.toto.value } items={state.drugs} removeHandler={removeHandler}/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
      </>
    );
}

function ItemsList({items, removeHandler}) {
    return (
      <div>
        {items.map((item, index) => {
          return (
            <p key={index}>
              {item.value} <br/>
              <button onClick={() => removeHandler(item.id, item.ctgy)}>Remove</button>
            </p>
          );
        })}
      </div>
    );
  }


//   <label htmlFor="">input here bitch</label>
//   <input value={myfuckingID && state.fofo.value } name="diseases" id="fofo" onChange={changeHandler} type="text"/>
//   <br/>
//   <input value={myfuckingID && state.koko.value } name="drugs" id="koko" onChange={changeHandler} type="text"/>
//   <br/>
//   <button onClick={addHandler}><RiHeartAddLine/></button>
//   <br/>
//   <TodoList items={state.diseases} removeHandler={removeHandler} />
//   <TodoList items={state.drugs} removeHandler={removeHandler}/>