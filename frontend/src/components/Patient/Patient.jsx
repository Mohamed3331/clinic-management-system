import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { StyledLink } from "../StyledLink";

export default function Patient({
  phoneNumber,
  patientName,
  createdAt,
  _id,
  registerPatient,
}) {
  const [myPatientStatus, setPatientStatus] = useState(false);
  const patientDateCreated = new Date(createdAt);

  const { token } = useSelector((state) => state.authToken);
  const { registeredPatients } = useSelector(
    (state) => state.registeredPatients
  );

  const authRoute = _id;

  useEffect(() => {
    const myPatient = registeredPatients.find((p) => p._id === _id);
    setPatientStatus(!!myPatient);
  }, [registeredPatients, _id]);

  return (
    <>
      <tr>
        <td>
          {myPatientStatus ? (
            <FaCheckCircle size={35} color="green" />
          ) : (
            <Button
              onClick={() => registerPatient(_id, patientName)}
              color="#bfb5ff"
              size="circle"
            >
              حجز المريض
            </Button>
          )}
        </td>
        <td>{phoneNumber ? phoneNumber : "No Phone Number"}</td>
        <td>{patientDateCreated.toString().slice(4, 15)}</td>
        <td>
          <StyledLink to={authRoute}>{patientName}</StyledLink>
        </td>
      </tr>
    </>
  );
}
