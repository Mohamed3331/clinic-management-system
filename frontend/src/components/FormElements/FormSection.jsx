import React from "react";
import './FormStyle.css'
import ErrorValidation from './ErrorValidation'
const FormSection = ({ register, formType, section, errors, title }) => {
  return (
    <>
      <div className="patient__list__personal__details__wrapper">
        <div className="patient__list__header">{title}</div>
        <div className="patient_personal_details_input">
          {formType &&
            Object.values(formType).map((s, index) => {
              return (
                <div className="form-section-style" key={index}>
                  <label htmlFor={s.key}>{s.labelName}</label>

                  {s.select ? (
                    <select {...register(section + "." + s.key)}>
                      {s.myOptions.map((opt, index) => (
                        <option value={opt} key={index}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={s.type}
                      {...register(section + "." + s.key, { ...s.validations })}
                    />
                  )}
                  <ErrorValidation>{errors[s.key] && <span>This field is required</span>}</ErrorValidation>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default FormSection;
