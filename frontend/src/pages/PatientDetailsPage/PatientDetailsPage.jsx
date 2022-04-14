import React, { useEffect, useState, useReducer } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";
import logo from "../../Assets/logo.png";
import Button from "../../components/Button/Button";
import { RiArrowGoBackFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { useForm } from "react-hook-form";
import "../../components/FormElements/InputHandler.css";
import FormSection from "../../components/FormElements/FormSection";
import * as myFormInputs from "../../Utils/FormInputs";
import { useDispatch, useSelector } from "react-redux";
import "./PatientDetailsPage.css";
import { localStorageHandler } from "../../Utils/localStorage";
import { logout } from "../../redux/authSlice";
import { fetchPatients } from "../../redux/patientsSlice";

const myReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      return { ...state, [action.inputId]: action.value };
    case "ADD_ITEM":
      return {
        ...state,
        [action.myCategory]: [
          ...state[action.myCategory],
          { ctgy: action.myCategory, value: state.myInput },
        ],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        [action.myCategory]: state[action.myCategory].filter(
          (item) => item.id !== action.id
        ),
      };
    default:
      return state;
  }
};

export default function DetailsSection() {
  // selectors
  const { token } = useSelector((state) => state.authToken);
  const { removeTokenLocalStorage } = localStorageHandler();

  // actions
  const dispatchRedux = useDispatch();

  // hooks
  const [MyState, dispatch] = useReducer(myReducer, {
    diseases: [],
    drugs: [],
    prevsurgeries: [],
    alergies: [],
    myInput: "",
  });

  const [myPatient, setMyPatient] = useState([]);
  const [loading, setLoading] = useState(false);

  // utils
  let history = useHistory();
  let { id } = useParams();

  let _token;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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
    });
  };

  const removeHandler = (id, ctgy) => {
    dispatch({
      type: "REMOVE_ITEM",
      myCategory: ctgy,
      id,
    });
  };

  useEffect(() => {
    dispatch(fetchPatients());
  }, []);

  useEffect(() => {
    setLoading(true);
    const fetchPatientData = async (id) => {
      try {
        const response = await axios({
          method: "get",
          url: `${process.env.REACT_APP_BACKEND_URL}/patient/${id}`,
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        reset(response.data.patient);
        setMyPatient(response.data.patient);
        dispatch(logout());
      } catch (e) {
        dispatchRedux(logout());
        removeTokenLocalStorage();
        history.push("/");
      }
      setLoading(false);
    };

    fetchPatientData(id);
  }, [id, reset, token, dispatchRedux]);
  console.log("fds");
  const onSubmit = async (data) => {
    delete MyState.myInput;
    delete data.createdAt;

    try {
      await axios({
        method: "patch",
        url: `${process.env.REACT_APP_BACKEND_URL}/patient/${id}`,
        data: { ...data, ...MyState },
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (e) {
      // removeTokenLocalStorage();
      console.log(e);
    }
  };

  return (
    <>
      <img width="220px" src={logo} alt="fds" />
      {!loading && (
        <form className={`form-control`} onSubmit={handleSubmit(onSubmit)}>
          <section className="patient__list__details__container">
            <div className="patient__list__details__left__wrapper">
              <div className="left_wrapper">
                <div className="patient__list__header__chronic">ملاحظات</div>
                <textarea {...register("patientNotes")} />
                <Button
                  color={"#DCDCDC"}
                  size="big"
                  textColor="black"
                  type="submit"
                  disabled={_token && !!_token}
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
                formType={myFormInputs.personalDetails}
              />

              <FormSection
                title="المعدلات الحيوية"
                errors={errors}
                section="vitalmodifiers"
                register={register}
                formType={myFormInputs.vitalModifiers}
              />

              <FormSection
                title="العادات المعتادة"
                errors={errors}
                section="usualhabits"
                register={register}
                formType={myFormInputs.usualHabits}
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
                      newItems={MyState.diseases}
                      oldItems={myPatient.diseases}
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
                      newItems={MyState.alergies}
                      oldItems={myPatient.alergies}
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
                      newItems={MyState.drugs}
                      oldItems={myPatient.drugs}
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

function ItemsList({ newItems, oldItems, removeHandler }) {
  const myList = oldItems && [...newItems, ...oldItems];
  return (
    <div>
      {myList &&
        myList.map((item, index) => {
          return (
            <div className="item_list_wrapper" key={index}>
              <span>{`#${index + 1} ${item.value}`}</span>
              <button onClick={() => removeHandler(item.id, item.ctgy)}>
                <FaTrashAlt className="icon-trash-style" size={18} />
              </button>
            </div>
          );
        })}
    </div>
  );
}
