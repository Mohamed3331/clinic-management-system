import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import PatientContext from './context/PatientContext'
import RegisteredPatientContext from './context/RegisteredPatientContext'
import {RecoilRoot} from "recoil"

ReactDOM.render(
      <PatientContext>
        <RegisteredPatientContext>
          <RecoilRoot>
              <App />
          </RecoilRoot>
        </RegisteredPatientContext>
      </PatientContext>,
  document.getElementById('root')
);

