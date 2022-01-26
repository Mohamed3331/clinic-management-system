import React, { useEffect } from "react";
import axios from "axios";
import RegisteredPatient from "../RegisteredPatient/RegisteredPatient";
import "./SideBar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../redux/patientsSlice";
import { fetchRegPatients } from "../../redux/registeredPatientsSlice";

export default function SideBar() {
  const { registeredPatients } = useSelector(
    (state) => state.registeredPatients
  );

  const dispatch = useDispatch();

  const unRegisterPatient = async (id) => {
    try {
      await axios({
        method: "delete",
        url: `${process.env.REACT_APP_BACKEND_URL}/unregister/patient/${id}`,
      });
      dispatch(fetchPatients());
      dispatch(fetchRegPatients());
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(fetchRegPatients());
  }, [dispatch]);

  return (
    <section className="sidebar_container">
      <div className="sidebar_wrapper">
        <div className="num_of_registred_patients_wrapper">
          <div className="registeredPatients_num-circle">
            <div className="registeredPatients_num">
              {registeredPatients.length}
            </div>
          </div>
          <div className="registeredPatients_text">عدد الحلات المسجلة</div>
        </div>
        {registeredPatients &&
          registeredPatients.map((regPatient, index) => (
            <RegisteredPatient
              key={index}
              num={index + 1}
              unRegisterPatient={unRegisterPatient}
              {...regPatient}
            />
          ))}
      </div>
    </section>
  );
}
