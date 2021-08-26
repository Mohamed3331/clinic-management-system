import React, {useEffect} from "react";
import { useForm, useController } from "react-hook-form";

const FormSection = ({register, soso, section,errors}) => {

  if (soso) {
    console.log((errors));
  }


  return (
    <>
      <div className="patient__list__personal__details__wrapper">

        <div className="patient__list__header">بيانات المريض</div>
        <div className="patient_personal_details_input">
            {soso && Object.values(soso).map((s,index) => {
              return (
                <div key={index}>
                  <label htmlFor={s.key}>{s.labelName}</label>
                  {s.select ? 
                  <select {...register(section + '.' + s.key)}>
                    {s.myOptions.map((opt,index) => <option key={index}>{opt}</option>)}
                  </select> 
                    : 
                  <input {...register(s.key, { required: s.required ? true : '' })} />
                  }
                  {errors[s.key] && <span>This field is required</span>}
                </div>
              )
            })}

            {/* <label htmlFor="patientName">اسم المريض</label>
            <input {...register("patientName", { required: true })} />

            <label htmlFor="job">المهنة</label>
            <input {...register("job", { required: true })} /> */}
        </div>

      </div>
    </>
  );
};

export default FormSection