import React, {useContext, useCallback, useEffect} from 'react'
import RegisteredPatients from '../RegisteredPatients/RegisteredPatients'
import axios from 'axios';
import {MyRegisteredPatientsContext} from '../../context/RegisteredPatientContext'
import { MyContext } from "../../context/PatientContext";
import './SideBar.css'

import {MyRegisteredPatients} from '../../Atom/Atom'
import { useRecoilState } from 'recoil';

export default function SideBar() {
    const {registeredPatients} = useContext(MyRegisteredPatientsContext)
    const {getData} = useContext(MyContext)

    const [regPatients, setRegPatients] = useRecoilState(MyRegisteredPatients)

    const getRegisteredPatients = useCallback( async () => {
            try {
              const response = await axios.get("http://localhost:5000/registerd/patients");
              const body = response.data.patients
              setRegPatients(body)
            } catch (e) {
              console.log(e);
            }
            
        }, [setRegPatients]
    )

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
                {regPatients && regPatients.map((patient,index) => (
                    <RegisteredPatients key={index} num={index + 1} unRegisterPatient={unRegisterPatient} {...patient} />
                ))}
            </div>
        </section>
    )
}
