import React, {useEffect} from "react";
import Modal from "../../components/Modal/Modal";
// import InputReducer from "../../components/InputHandler/InputHandler";
import axios from 'axios';
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";

import "./AddPatient.css";

const AddPatient = (props) => {
  // const { handleFormSubmit } = useContext(MyContext);

  const { register, handleSubmit, formState } = useForm();

  const submit = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/patient`,
        data,
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal
        show={props.showForm}
        size="3rem 2rem"
        onCancel={props.closeMapHandler}
      >
        <form className={`form-styling`} onSubmit={handleSubmit(submit)}>
          <label htmlFor="patientName"> اسم المريض </label>
          <input
            className={`${formState.errors.patientName && "form-control--invalid"}`}
            placeholder={`${formState.errors.patientName ? "برجاء ادخال الاسم ثلاثى" : ""}`}
            type="text"
            {...register("patientName", { required: true })}
          />

          <label htmlFor="patientAge"> السن </label>
          <input
            className={`${formState.errors.age && "form-control--invalid"}`}
            placeholder={`${formState.errors.age ? "برجاء ادخال السن" : ""}`}
            type="number"
            {...register("age", { required: true })}
          />

          <label htmlFor="patientJob"> المهنة </label>
          <input
            className={`${formState.errors.job && "form-control--invalid"}`}
            placeholder={`${formState.errors.job ? "برجاء ادخال المهنة" : ""}`}
            type="text"
            {...register("job", { required: true })}
          />

          <label htmlFor="phoneNumber"> رقم الهاتف </label>
          <input
            className={`${formState.errors.phoneNumber && "form-control--invalid"}`}
            placeholder={`${formState.errors.phoneNumber ? "برجاء ادخال رقم الهاتف" : ""}`}
            type="text"
            {...register("phoneNumber", { required: true })}
          />

          <label htmlFor="patientBirthDate"> تاريخ الميلاد </label>
          <input
            className={`${formState.errors.birthDate && "form-control--invalid"}`}
            placeholder={`${formState.errors.birthDate ? "برجاء ادخال تاريخ الميلاد" : ""}`}
            type="date"
            {...register("birthDate", { required: true })}
          />

          <label htmlFor="medicalInsurance">التامين</label>
          <label htmlFor="medicalInsurance"> نعم
            <input  type="radio" value="Yes" {...register("insurance", { required: true })}/>
          </label>  
          <label htmlFor="medicalInsurance">لا
            <input type="radio" value="No" {...register("insurance", { required: true })}/>
          </label>

          <Button type="submit" size="small"> Submit</Button>
        </form>
      </Modal>
    </>
  );
};

export default AddPatient;
