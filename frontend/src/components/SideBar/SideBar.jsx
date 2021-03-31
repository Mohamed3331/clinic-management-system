import React from 'react'
import { IoMdRemoveCircleOutline } from 'react-icons/io';
import './SideBar.css'

export default function SideBar() {
    return (
        <section className="sidebar_container">
            <div className="sidebar_wrapper">
                <div className="num_of_registred_patients_wrapper">
                    <div className="registeredPatients_num-circle">
                        <div className="registeredPatients_num">32</div>
                    </div>
                    <div className="registeredPatients_text">عدد الحلات المسجلة</div>
                </div>
                <div className="registered_patient">
                    <IoMdRemoveCircleOutline color="white" size={45}/>
                    <div className="registered_patient_name">احمد محمد خليل</div>
                    <div className="registered_patient_number">#1</div>
                </div>
                <hr/>
            </div>
        </section>
    )
}
