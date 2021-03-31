import React, { Component } from "react";
import { FaCheckCircle } from 'react-icons/fa';
import "./PatientsList.css";
import Button from "../Button/Button";

export default class PatientsList extends Component {
  state = {
    added: false
  }

  render() {
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
            <tr>
              <td> {this.state.added ? <FaCheckCircle size={35} color="green"/> : <Button color="#615C9C" size="circle">حجز المريض</Button> } </td>
              <td>01281115712</td>
              <td>Apr 26, 2017</td>
              <td>على محمد نجيب</td>
            </tr>
           </tbody>
          </table>
        </section>
      </>
    );
  }
}





          {/* <div className="patientlist-header">
                            <h2>رقم الهاتف</h2>
                            <h2>تاريخ الانشاء</h2>
                            <h2>اسم المريض</h2>
                        </div>
                        <hr/>
                        <div className="patientlist_wrapper">
                            <div className="patient_details_list">
                                <Button color="#615C9C" size="circle">
                                    حجز المريض
                                </Button>
                                <div className="patient_details_list_phone">
                                    01281115712
                                </div>
                                <div className="patient_details_list_date">
                                    Apr 26, 2017
                                </div>
                                <div className="patient_details_list_name">
                                    على محمد نجيب
                                </div>
                            <hr className="headline"/>
                            </div>
                        </div> */}