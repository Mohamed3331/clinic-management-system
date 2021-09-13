import React, { useState, useEffect, useContext } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Button/Button";
import { MyRegisteredPatientsContext } from "../../context/RegisteredPatientContext";
import { LoggedUser } from "../../Atom/Atom";
import { useRecoilValue } from "recoil";

const StyledLink = styled(Link)`
  color: black;
  font-weight: bold;
  text-decoration: none;
  &:hover {
    color: #615c9c;
    border-bottom: 2px solid #615c9c;
  }
`;

export default function Patient({
  phoneNumber,
  patientName,
  createdAt,
  _id,
  registerPatient,
}) {
  const { registeredPatients } = useContext(MyRegisteredPatientsContext);
  const [myPatientStatus, setPatientStatus] = useState(false);
  const isLoggedIn = useRecoilValue(LoggedUser);
  const patientDateCreated = new Date(createdAt);

  useEffect(() => {
    const myPatient = registeredPatients.find((p) => p._id === _id);
    setPatientStatus(myPatient ? true : false);
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
          <StyledLink to={`/${isLoggedIn ? _id : ""}`}>
            {patientName}
          </StyledLink>
        </td>
      </tr>
    </>
  );
}
