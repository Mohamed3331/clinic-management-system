import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

import { MyContext } from "../../context/PatientContext";
import logo from "../../Assets/logo.png";
import Button from "../../components/Button/Button";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import '../../components/InputHandler/InputHandler.css'
import FormSection from '../../components/FormElements/FormSection'
import "./PatientDetailsPage.css";

let soso = {
  name: {
    key: 'patientName',
    labelName: 'اسم المريض',
    required: true
  },
  age: {
    key: 'age',
    labelName: 'السن',
    required: true
  },
  birthdate: {
    key: 'birthDate',
    labelName: 'الوظيفة',
    required: true
  },
  insurance: {
    key: 'insurance',
    labelName: 'التامين',
    required: true
  },
  phone: {
    key: 'phoneNumber',
    labelName: 'هاتف',
    required: true
  },
  bloodtype: {
    key: 'bloodtype',
    labelName: 'فصيلة الدم',
    select: true,
    myOptions: ['A+', 'A-', 'B+', 'B-']
  },
}//fd

export default function DetailsSection() {
  let history = useHistory();
  let { id } = useParams();

  const [patientData, setPatientData] = useState();
  // const {inputHandler, handleFormSubmit} = useContext(MyContext)
  const [loading, setLoading] = useState(false);

  const { register,handleSubmit, formState: { errors }} = useForm({
    defaultValues: {
        patientName: "",
        age: "",
        job: "",
        birthDate: "",
        insurance: "",
        phoneNumber: "",
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
  });

  const onSubmit = (data) => console.log(data);
  console.log(errors);
  // {valueAsNumber: true}
  // {valueAsDate: true}

  useEffect(() => {
    setLoading(true);
    const fetchPatientData = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/patient/${id}`);
        if (response.statusText === "OK") {
          setPatientData(response.data.patient);
        }
        console.log(response.data.patient);
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    };
    fetchPatientData(id);
  }, [id]);

  return (
    <>
      <img width="220px" src={logo} alt="fds" />
      {!loading && patientData ? (
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

            <FormSection errors={errors} section="vitalmodifiers" register={register} soso={soso}/>

            {/* <FormSection register={register} age="age" salary="salary"/> */}

              {/* <div className="patient__list__personal__details__wrapper">
                <div className="patient__list__header">بيانات المريض</div>
                <div className="patient_personal_details_input">
                  <label htmlFor="patientName">اسم المريض</label>
                  <input {...register("patientName", { required: true })} />

                  <label htmlFor="job">المهنة</label>
                  <input {...register("job", { required: true })} />

                  <label htmlFor="age">السن</label>
                  <input type="number" {...register("age", { required: true,valueAsNumber: true }) }/>

                  <label htmlFor="birthDate">تاريخ الميلاد</label>
                  <input
                    type="date"
                    {...register("birthDate", {
                      required: true,
                      valueAsDate: true,
                    })}
                  />

                  <label htmlFor="phoneNumber">رقم الهاتف</label>
                  <input
                    type="number"
                    {...register("phoneNumber", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />

                  <label htmlFor="insurance">التامين</label>
                  <input
                    type="checkbox"
                    {...register("insurance", { required: true })}
                  />
                </div>
              </div> */}
                    
              {/* <div className="patient__list__vital__modifiers__wrapper">
                <div className="patient__list__header">المعدلات الحيوية</div>
                <div className="patient_vital_modifiers_input">
                  <label htmlFor="bloodtype">فصيلة الدم</label>
                  <select {...register("vitalmodifiers.bloodtype")}>
                    <option>A+</option>
                    <option>A-</option>
                    <option>B+</option>
                    <option>B-</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                  </select>

                  <label htmlFor="heartrate">معدل النبض</label>
                  <input {...register("vitalmodifiers.heartrate")} />

                  <label htmlFor="bloodpressure">ضغط الدم</label>
                  <input {...register("vitalmodifiers.bloodpressure")} />

                  <label htmlFor="breathing">التنفس</label>
                  <input {...register("vitalmodifiers.breathing")} />

                  <label htmlFor="weight">الوزن</label>
                  <input
                    type="number"
                    {...register("vitalmodifiers.weight", {
                      valueAsNumber: true,
                    })}
                  />
                </div>
              </div>

              <div className="patient__list__usual__habits__wrapper"> 
                  <div className="patient__list__header">العادات المنتظمة</div>
                  <div className="patient_usual_habits_input">
                    <label htmlFor="heartrate">معدل النبض</label>
                    <input {...register("vitalmodifiers.heartrate")} />
                  </div>
              </div> */}

            </div>
          </section>
        </form>
      ) : (
        <h1>still loading patient's data</h1>
      )}
    </>
  );
}

// function ItemsList({items, removeHandler}) {
//     return (
//       <div>
//         {items.map((item, index) => {
//           return (
//             <div className="item_list_wrapper" key={index}>
//               <span>{`#1 ${item.value}`}</span>
//               <button onClick={() => removeHandler(item.id, item.ctgy)}><FaTrashAlt className="icon-trash-style" size={16}/></button>
//             </div>
//           );
//         })}
//       </div>
//     );
//   }
