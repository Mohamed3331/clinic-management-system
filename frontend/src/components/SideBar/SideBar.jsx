import React, {useContext, useEffect} from 'react'
import axios from 'axios';
import {MyRegisteredPatientsContext} from '../../context/RegisteredPatientContext'
import RegisteredPatient from '../RegisteredPatient/RegisteredPatient'
import { MyContext } from "../../context/PatientContext";
import './SideBar.css'

export default function SideBar() {
    const {registeredPatients, getRegisteredPatients} = useContext(MyRegisteredPatientsContext)
    const {getData} = useContext(MyContext)

    const unRegisterPatient = async (id) => {
        try {
            await axios({
                method: 'delete',
                url: `http://localhost:5000/unregister/patient/${id}`
            });
            getData()
            getRegisteredPatients()
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getRegisteredPatients()
    }, [getRegisteredPatients])


    
    return (
        <section className="sidebar_container">
            <div className="sidebar_wrapper">
                <div className="num_of_registred_patients_wrapper">
                    <div className="registeredPatients_num-circle">
                        <div className="registeredPatients_num">{registeredPatients.length}</div>
                    </div>
                    <div className="registeredPatients_text">عدد الحلات المسجلة</div>
                </div>
                {registeredPatients && registeredPatients.map((regPatient,index) => (
                    <RegisteredPatient key={index} num={index + 1} unRegisterPatient={unRegisterPatient} {...regPatient} />
                ))}
            </div>
        </section>
    )
}
