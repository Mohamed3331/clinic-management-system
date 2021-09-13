import React from 'react'
import PulseLoader from "react-spinners/PulseLoader";
import { css } from "@emotion/react";

const override = css`
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
`;

const LoadingSpinner = () => {

    return (
        <>
            <PulseLoader css={override} size={30} margin={10} />
        </>
    )
}

export default LoadingSpinner
