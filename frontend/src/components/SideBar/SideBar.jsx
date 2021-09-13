import React, {useContext, useEffect} from 'react'
import axios from 'axios';
import {MyRegisteredPatientsContext} from '../../context/RegisteredPatientContext'
import RegisteredPatient from '../RegisteredPatient/RegisteredPatient'
import { MyContext } from "../../context/PatientContext";
import {motion, AnimatePresence} from 'framer-motion'
import './SideBar.css'

export default function SideBar() {
    const {registeredPatients, getRegisteredPatients} = useContext(MyRegisteredPatientsContext)
    const {getData} = useContext(MyContext)

    const unRegisterPatient = async (id) => {
        try {
            await axios({
                method: 'delete',
                url: `${process.env.REACT_APP_BACKEND_URL}/unregister/patient/${id}`
            });
            getData()
            getRegisteredPatients()
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getRegisteredPatients()
    }, [getRegisteredPatients])

    
    
    return (
        <section className="sidebar_container">
            <div className="sidebar_wrapper">
                <div className="num_of_registred_patients_wrapper">
                    <div 
                        className="registeredPatients_num-circle"
                    >
                        <div className="registeredPatients_num">{registeredPatients.length}</div>
                    </div>
                    <div  
                        className="registeredPatients_text"
                    >
                        عدد الحلات المسجلة
                    </div>
                </div>
                {registeredPatients && registeredPatients.map((regPatient,index) => (
                    <AnimatePresence key={index} exitBeforeEnter>
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            transition={{delay: 0.4, duration: 0.7, stiffness: 5}}
                        >
                            <RegisteredPatient num={index + 1} unRegisterPatient={unRegisterPatient} {...regPatient} />
                        </motion.div>
                    </AnimatePresence>
                ))}
            </div>
        </section>
    )
}
