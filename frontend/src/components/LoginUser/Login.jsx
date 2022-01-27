import React, { useState } from "react";
import Modal from "../../components/Modal/Modal";
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/authSlice";
import { localStorageHandler } from "../../Utils/localStorage";
import ErrorValidation from "../FormElements/ErrorValidation";

const Login = (props) => {
  const [Error, setError] = useState("");
  const { register, handleSubmit, formState } = useForm();
  const { setTokenLocalStorage } = localStorageHandler();
  const dispatch = useDispatch();

  const submit = async (data) => {
    dispatch(
      loginUser({
        email: data.email,
        password: data.password,
      })
    )
      .unwrap()
      .then((originalPromiseResult) => {
        setTokenLocalStorage(originalPromiseResult.token);
        props.closeMapHandler();
      })
      .catch((rejectedValueOrSerializedError) => {
        setError(rejectedValueOrSerializedError);
      });
  };

  return (
    <>
      <Modal
        show={props.showForm}
        size="3rem 2rem"
        onCancel={props.closeMapHandler}
      >
        <form className={`form-styling`} onSubmit={handleSubmit(submit)}>
          <label htmlFor="patientName"> البريد الإلكتروني </label>
          <input
            className={`${formState.errors.email && "form-control--invalid"}`}
            type="text"
            {...register("email", { required: true })}
          />

          <label htmlFor="patientAge"> كلمه السر </label>
          <input
            className={`${
              formState.errors.password && "form-control--invalid"
            }`}
            type="password"
            {...register("password", { required: true })}
          />

          <Button type="submit" size="small">
            Submit
          </Button>
        </form>
        {Error && (
          <ErrorValidation>
            Authentication Failed, wrong credentials ({Error})
          </ErrorValidation>
        )}
      </Modal>
    </>
  );
};

export default Login;
