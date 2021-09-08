import React, { useContext } from "react";
import Patient from "../Patient/Patient";
import styled from "styled-components";
import axios from 'axios';
import { css } from "@emotion/react";
import PulseLoader from "react-spinners/PulseLoader";
import { MyContext } from "../../context/PatientContext";
import {MyRegisteredPatientsContext} from '../../context/RegisteredPatientContext'
import "./PatientsList.css";

const override = css`
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
`;

const EmptyHeaderStyle = styled.h2`
  font-size: 50px;
  color: black;
  position: absolute;
  font-weight: bold;
  top: 50%;
  left: 40%;
`;

export default function PatientsList() {
  const { patientList, loadingList, getData, searchPatientResult} = useContext(MyContext);
  const {getRegisteredPatients} = useContext(MyRegisteredPatientsContext)

  const registerPatient = async (id, name) => {
    try {
        await axios({
            method: 'post',
            url: `http://localhost:5000/register/patient`,
            data: {
              id,
              name,
              register: true
            }
        });
        getRegisteredPatients()
        getData()
    } catch (e) {
        console.log(e);
    }
  };

  if (patientList.length === 0) {
    return <EmptyHeaderStyle>No Patients to Display</EmptyHeaderStyle>;
  }

  return (
    <>
      {loadingList ? (
        <PulseLoader loading={loadingList} css={override} size={30} margin={10} />
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
