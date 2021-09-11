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
import { useRecoilValue, useRecoilState } from 'recoil';
import {Token, AdminID, LoggedUser} from '../../Atom/Atom'

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
  const [myPatient, setMyPatient] = useState([])
  const [MyState, dispatch] = useReducer(myReducer, {
    diseases: [],
    drugs: [],
    prevsurgeries: [],
    alergies: [],
    myInput: ''
  })
  console.log(MyState);
  // const [token, setToken] = useRecoilState(Token)
  const adminID = useRecoilValue(AdminID)
  const [isLoggedIn, setLoggedIn] = useRecoilState(LoggedUser)
  
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
        // myId: uuidv4(),
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

  const { register, handleSubmit, reset, formState: { errors }} = useForm();

  useEffect(() => {
    setLoading(true);
    const storedData = JSON.parse(localStorage.getItem('adminData'))
    
    const fetchPatientData = async (id) => {
      try {
        const response = await axios({
          method: "get",
          url: `http://localhost:5000/patient/${id}`,
          headers: {
            Authorization: 'Bearer ' + storedData.token,
            adminID: storedData.uid
          }
        })
        if (response.data.message) {
          localStorage.setItem('adminData',JSON.stringify({uid: '', token: ''} ));
          setLoggedIn(false)
        }else {
          reset(response.data.patient)
          setMyPatient(response.data.patient)
        }
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
      
    };
    fetchPatientData(id);
    
  }, [id, reset]);

  const onSubmit = async (data) => {
    delete MyState.myInput
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
      {!loading && (
        <form className={`form-control`} onSubmit={handleSubmit(onSubmit)}>
          <section className="patient__list__details__container">
            <div className="patient__list__details__left__wrapper">
              <div className="left_wrapper">
                <div className="patient__list__header__chronic">ملاحظات</div>
                {/* <input {...register("patientNotes")} /> */}
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
                  <RiArrowGoBackFill size="22" /> الرجوع
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
                  <div className="patient__list__header__chronic">
                    الجراحات السابقة
                  </div>
                  <div className="input__section__wrapper">
                    <div className="input__section">
                      <input
                        name="prevsurgeries"
                        placeholder="...اضف هنا"
                        id="myInput"
                        onChange={changeHandler}
                        type="text"
                      />
                      <button onClick={() => addHandler("prevsurgeries")}>
                        Add
                      </button>
                    </div>
                    <ItemsList
                      newItems={MyState.prevsurgeries}
                      oldItems={myPatient.prevsurgeries}
                      removeHandler={removeHandler}
                    />
                  </div>
                </div>

                <div className="patient_chronic_diseases_input">
                  <div className="patient__list__header__chronic">
                    الامراض المزمنة
                  </div>
                  <div className="input__section__wrapper">
                    <div className="input__section">
                      <input
                        name="diseases"
                        placeholder="...اضف هنا"
                        id="myInput"
                        onChange={changeHandler}
                        type="text"
                      />
                      <button onClick={() => addHandler("diseases")}>
                        Add
                      </button>
                    </div>
                    <ItemsList
                      items={
                        (MyState.diseases, myPatient && myPatient.diseases)
                      }
                      removeHandler={removeHandler}
                    />
                  </div>
                </div>

                <div className="patient_chronic_diseases_input">
                  <div className="patient__list__header__chronic">
                    الحساسية (دواء - طعام - مادة)
                  </div>
                  <div className="input__section__wrapper">
                    <div className="input__section">
                      <input
                        name="alergies"
                        placeholder="...اضف هنا"
                        id="myInput"
                        onChange={changeHandler}
                        type="text"
                      />
                      <button onClick={() => addHandler("alergies")}>
                        Add
                      </button>
                    </div>
                    <ItemsList
                      items={
                        (MyState.alergies, myPatient && myPatient.alergies)
                      }
                      removeHandler={removeHandler}
                    />
                  </div>
                </div>

                <div className="patient_chronic_diseases_input">
                  <div className="patient__list__header__chronic">
                    الادوية الحالية و التطعيمات
                  </div>
                  <div className="input__section__wrapper">
                    <div className="input__section">
                      <input
                        name="drugs"
                        placeholder="...اضف هنا"
                        id="myInput"
                        onChange={changeHandler}
                        type="text"
                      />
                      <button onClick={() => addHandler("drugs")}>Add</button>
                    </div>
                    <ItemsList
                      items={MyState.drugs}
                      removeHandler={removeHandler}
                    />
                  </div>
                </div>
                
              </div>
            </div>
          </section>
        </form>
      )}
    </>
  );
}

function ItemsList({newItems, oldItems, removeHandler}) {
  const myList = oldItems && [...newItems, ...oldItems]
  return (
      <div>
        {myList && myList.map((item, index) => {
          return (
            <div className="item_list_wrapper" key={index}>
              <span>{`#${index + 1} ${item.value}`}</span>
              <button onClick={() => removeHandler(item.id, item.ctgy)}><FaTrashAlt className="icon-trash-style" size={18}/></button>
            </div>
          );
        })}
      </div>
    );
  }







