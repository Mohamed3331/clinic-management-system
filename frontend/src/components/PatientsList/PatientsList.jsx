import React, { useContext } from "react";
import Patient from "../Patient/Patient";
import styled from "styled-components";
import axios from 'axios';
import { MyContext } from "../../context/PatientContext";
import {MyRegisteredPatientsContext} from '../../context/RegisteredPatientContext'
import { useRecoilState } from "recoil";
import { LoadingSpin } from "../../Atom/Atom";
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import "./PatientsList.css";

const EmptyHeaderStyle = styled.h2`
  font-size: 50px;
  color: black;
  position: absolute;
  font-weight: bold;
  top: 50%;
  left: 40%;
`;

export default function PatientsList() {
  const { patientList, getData, searchPatientResult} = useContext(MyContext);
  const {getRegisteredPatients} = useContext(MyRegisteredPatientsContext)
  const [loading, setLoading] = useRecoilState(LoadingSpin)

  const registerPatient = async (id, name) => {
    setLoading(true)
    try {
        await axios({
            method: 'post',
            url: `${process.env.REACT_APP_BACKEND_URL}/register/patient`,
            data: {
              id,
              name,
            }
        });
        getRegisteredPatients()
        getData()
        setLoading(false)
    } catch (e) {
      console.log(e);
    }
  };

  if (patientList.length === 0) {
    return <EmptyHeaderStyle>No Patients to Display</EmptyHeaderStyle>;
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="patientlist_container">
          <table id="patients">
            <tbody>
              <tr>
                <th></th>
                <th>رقم الهاتف</th>
                <th>تاريخ الانشاء</th>
                <th>اسم المريض</th>
              </tr>
              {
                searchPatientResult.length > 0 ? 
                (
                  searchPatientResult.map((patient, index) => (
                    <Patient key={index} registerPatient={registerPatient} {...patient.patientDetails} {...patient}/>
                  )) 
                )
                : 
                (
                  patientList.map((patient, index) => (
                    <Patient key={index} registerPatient={registerPatient} {...patient.patientDetails} {...patient}/>
                  ))
                )
              }
            </tbody>
          </table>
        </section>
      )}
    </>
  );
}
