import React from "react";
import { IoMdRemoveCircleOutline } from "react-icons/io";

import "./RegisteredPatient.css";

export default function RegisteredPatient({
  unRegisterPatient,
  name,
  num,
  _id,
}) {
  return (
    <>
      <div className="registered_patient" type="submit">
        <IoMdRemoveCircleOutline
          type="submit"
          onClick={() => unRegisterPatient(_id)}
          color="white"
          size={35}
        />
        <div className="registered_patient_name">{name}</div>
        <div className="registered_patient_number">#{num}</div>
      </div>
      <hr />
    </>
  );
}
