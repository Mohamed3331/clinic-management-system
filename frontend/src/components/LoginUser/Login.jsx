import React from "react";
import Modal from "../../components/Modal/Modal";
import axios from 'axios';
import Button from "../../components/Button/Button";
import { useForm } from "react-hook-form";
import { useRecoilState } from 'recoil';
import {LoggedUser} from '../../Atom/Atom'

const Login = (props) => {
  const { register, handleSubmit, formState } = useForm();
  const [isLoggedIn, setLoggedIn] = useRecoilState(LoggedUser)
  
  const submit = async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_BACKEND_URL}/admin/login`,
        data: {
          email: data.email,
          password: data.password,
        },
      });
      if (response.statusText === "OK") {
        props.login(response.data.admin._id, response.data.token);
        setLoggedIn(true)
      } 
      if (isLoggedIn) console.log('logged');
      props.closeMapHandler()
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

          <label htmlFor="patientName"> البريد الإلكتروني </label>
          <input
            className={`${formState.errors.email && "form-control--invalid"}`}
            type="text"
            {...register("email", { required: true })}
          />

          <label htmlFor="patientAge"> كلمه السر </label>
          <input
            className={`${formState.errors.password && "form-control--invalid"}`}
            type="password"
            {...register("password", { required: true })}
          />

          <Button type="submit" size="small">Submit</Button>
        </form>
      </Modal>
    </>
  );
};

export default Login;
