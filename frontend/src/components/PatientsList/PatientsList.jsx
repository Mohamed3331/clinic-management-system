import React, { useEffect } from "react";
import Patient from "../Patient/Patient";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients } from "../../redux/patientsSlice";
import { fetchRegPatients } from "../../redux/registeredPatientsSlice";
import "./PatientsList.css";

export default function PatientsList() {
  const { filteredPatients } = useSelector((state) => state.filteredPatients);
  const { patients } = useSelector((state) => state.patients);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const registerPatient = async (id, name) => {
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL}/register/patient`,
        data: {
          id,
          name,
        },
      });

      dispatch(fetchRegPatients());
      dispatch(fetchPatients());
    } catch (e) {
      console.log(e);
    }
  };

  if (!patients || patients.length === 0) {
    return (
      <>
        <LoadingSpinner />
        <h1>No Patients to Display</h1>
      </>
    );
  }

  return (
    <>
      <section className="patientlist_container">
        <table id="patients">
          <tbody>
            <tr>
              <th></th>
              <th>رقم الهاتف</th>
              <th>تاريخ الانشاء</th>
              <th>اسم المريض</th>
            </tr>
            {filteredPatients.length > 0
              ? filteredPatients.map((patient, index) => (
                  <Patient
                    key={index}
                    registerPatient={registerPatient}
                    {...patient.patientDetails}
                    {...patient}
                  />
                ))
              : patients.map((patient, index) => (
                  <Patient
                    key={index}
                    registerPatient={registerPatient}
                    {...patient.patientDetails}
                    {...patient}
                  />
                ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
