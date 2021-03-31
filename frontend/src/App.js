import React from "react";
import { BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';
import PatientDetailsPage from './pages/PatientDetailsPage/PatientDetailsPage'
import HomePage from './pages/HomePage/HomePage'

import "./App.css";

function App () {
  
    return (
      <>
        <div className="app_container">
          {/* <HomePage/> */}
          <BrowserRouter>
            <Switch> 
               <Route exact path="/" component={HomePage}></Route> 
               <Route exact path="/:patientId" component={PatientDetailsPage} />  
          {/* <Redirect to="/" /> */}
          </Switch>
          </BrowserRouter> 
        </div>
      </>
    );
}



export default App;
