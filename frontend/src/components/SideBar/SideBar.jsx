import React, { useEffect, useState } from "react";
import axios from "axios";
import RegisteredPatient from "../RegisteredPatient/RegisteredPatient";
import "./SideBar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients } from "../../redux/patientsSlice";
import { fetchRegPatients } from "../../redux/registeredPatientsSlice";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function SideBar() {
  const [sideBarOpen, setSideBarOpen] = useState(true);
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

  const sidebar_wrapper_Style = {
    width: sideBarOpen ? "20rem" : "0rem",
  };

  const sidebar_container_Style = {
    height: sideBarOpen ? "100vh" : "0vh",
  };

  return (
    <>
      <section className="sidebar_container" style={sidebar_container_Style}>
        <div
          onClick={() => setSideBarOpen(!sideBarOpen)}
          className="sidebar-close"
          style={sideBarOpen ? { left: "20rem" } : { left: "0rem" }}
        >
          {sideBarOpen ? (
            <AiOutlineClose size={30} color="white" />
          ) : (
            <FaBars size={30} color="white" />
          )}
        </div>
        <div className="sidebar_wrapper" style={sidebar_wrapper_Style}>
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
    </>
  );
}
