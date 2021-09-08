import React, {useState, useEffect} from "react";
import { FaCheckCircle } from 'react-icons/fa';
import { Link} from 'react-router-dom';
import styled from "styled-components";
import Button from "../Button/Button";
import { useRecoilValue } from 'recoil';
import {MyRegisteredPatients} from '../../Atom/Atom'

const StyledLink = styled(Link)`
        color: black;
        font-weight: bold;
        text-decoration: none;
        &:hover {
            color: #615C9C;
            border-bottom: 2px solid #615C9C;
        }
    `;

export default function Patient({phoneNumber, patientName, createdAt, _id, registerPatient}) {

    const [myPatientStatus, setPatientStatus] = useState(false)
    const ViewPatients = useRecoilValue(MyRegisteredPatients)
    const patientDateCreated = new Date(createdAt)   

    useEffect(() => {
        const myPatient = ViewPatients.find(p => p._id === _id)
        setPatientStatus(myPatient ? true : false)
    }, [ViewPatients, _id])

    return (
        <>
            <tr >
                <td> 
                    {
                        myPatientStatus ? 
                        <FaCheckCircle size={35} color="green"/> : 
                        <Button 
                            onClick={() => registerPatient(_id, patientName)} 
                            color="#615C9C" 
                            size="circle">حجز المريض
                        </Button> 
                    } 
                </td>
                <td>{phoneNumber ? phoneNumber : 'No Phone Number'}</td>
                <td>{patientDateCreated.toString().slice(4,15)}</td>
                <td><StyledLink to={`/${_id}`}>{patientName}</StyledLink></td>
            </tr>
        </>
    )
}
