import React, { useEffect, useState, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import logo from "../../Assets/logo.png";
import Button from "../../components/Button/Button";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import '../../components/InputHandler/InputHandler.css'
import FormSection from '../../components/FormElements/FormSection'
import "./PatientDetailsPage.css";

const personalDetails = {
  patientName: {
    key: 'patientName',
    labelName: 'اسم المريض',
    validations: {
      required: true,
    }
  },
  phone: {
    key: 'phoneNumber',
    labelName: 'رقم الهاتف',
    validations: {
      required: true,
    }
  },
  birthdate: {
    key: 'birthDate',
    labelName: 'تاريخ الميلاد',
    type: 'date',
    validations: {
      required: true,
    }
  },
  age: {
    key: 'age',
    labelName: 'السن',
    type: 'number',
    validations: {
      required: true,
      valueAsNumber: true,
    }
  },
  insurance: {
    key: 'insurance',
    labelName: 'التامين',
    type: 'checkbox',
    validations: {
      required: true,
    }
  },
}

const vitalModifiers = {
  bloodpressure: {
    key: 'bloodpressure',
    labelName: 'ضغط الدم',
  },
  breathing: {
    key: 'breathing',
    labelName: 'التنفس',
  },
  heartrate: {
    key: 'heartrate',
    labelName: 'معدل النبض',
  },
  bloodtype: {
    key: 'bloodtype',
    labelName: 'فصيلة الدم',
    select: true,
    myOptions: ['none', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
  },
  weight: {
    key: 'weight',
    labelName: 'الوزن',
  },
}

const usualHabits = {
  eatfruits: {
    key: 'eatfruits',
    labelName: 'اكل الفواكهة',
    type: 'checkbox'
  },
  eatvegetables: {
    key: 'eatvegetables',
    labelName: 'اكل الخضراوات',
    type: 'checkbox'
  },
  eatmeat: {
    key: 'eatmeat',
    labelName: 'اكل الحوم',
    type: 'checkbox'
  },
  smoke: {
    key: 'smoke',
    labelName: 'التدخين',
    select: true,
    myOptions: ['none', 'Never', 'Seldom', 'Regularly', 'Intensive']
    
  },
  alcohol: {
    key: 'alcohol',
    labelName: 'الكحول',
    select: true,
    myOptions: ['none', 'Never', 'Seldom', 'Regularly', 'Intensive']
  },
  workout: {
    key: 'workout',
    labelName: 'ممارسة الرياضة',
    select: true,
    myOptions: ['none', 'Never', 'Seldom', 'Regularly', 'Intensive']
  },
}

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
  const [MyState, dispatch] = useReducer(myReducer, initialState)
  let history = useHistory();
  let { id } = useParams();

    const changeHandler = (e) => {
      dispatch({
        type: "INPUT_CHANGE",
        inputId: e.target.id,
        value: e.target.value,
      });
    };

    const addHandler = (myCategory) => {
      dispatch({
        type: "ADD_ITEM",
        myCategory,
        myId: uuidv4(),
      });
    };

    const removeHandler = (id, ctgy) => {
      dispatch({
        type: "REMOVE_ITEM",
        myCategory: ctgy,
        id,
      });
    };

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset,formState: { errors }} = useForm();

  useEffect(() => {
    setLoading(true);
    const fetchPatientData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/patient/${id}`);
        
        if (response.statusText === "OK") {
          reset(response.data.patient)
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchPatientData(id);
    
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      await axios({
        method: "patch",
        url: `http://localhost:5000/patient/${id}`,
        data: {...data, ...MyState}
      });
    } catch (e) {
      console.log(e);
    }
  }
  console.log(errors);

  return (
    <>
      <img width="220px" src={logo} alt="fds" />
      {!loading ? (
        <form className={`form-control`} onSubmit={handleSubmit(onSubmit)}>
          <section className="patient__list__details__container">
            <div className="patient__list__details__left__wrapper">
              <div className="left_wrapper">
                <div className="patient__list__header__chronic">ملاحظات</div>
                {/* <InputReducer
                  classname="text-area-style"
                  id="notes"
                  name="patientNotes"
                  type="text"
                  element="textarea"
                  onInput={inputHandler}
                /> */}
                <Button
                  color={"#DCDCDC"}
                  size="big"
                  textColor="black"
                  type="submit"
                >
                  Save <FaEdit size="25" />
                </Button>
                <Button
                  onClick={() => history.push("/")}
                  color={"#000000"}
                  size="small"
                  textColor="white"
                >
                  <RiArrowGoBackFill size="22" /> الرجوع{" "}
                </Button>
              </div>
            </div>

            <div className="patient__list__details__right__wrapper">
              <FormSection
                title="بيانات المريض"
                errors={errors}
                section="patientDetails"
                register={register}
                formType={personalDetails}
              />

              <FormSection
                title="المعدلات الحيوية"
                errors={errors}
                section="vitalmodifiers"
                register={register}
                formType={vitalModifiers}
              />

              <FormSection
                title="العادات المعتادة"
                errors={errors}
                section="usualhabits"
                register={register}
                formType={usualHabits}
              />

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
        </form>
      ) : (
        <h1>still loading patient's data</h1>
      )}
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







