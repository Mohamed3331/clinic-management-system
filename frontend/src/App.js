import React, {useEffect, useCallback} from "react";
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import PatientDetailsPage from './pages/PatientDetailsPage/PatientDetailsPage'
import HomePage from './pages/HomePage/HomePage'
import { useRecoilState } from 'recoil';
import {LoggedUser} from './Atom/Atom'

import "./App.css";

function App () {
  const [isLoggedIn, setLoggedIn] = useRecoilState(LoggedUser)

  const login = useCallback((uid, token) => {
    const tokenDate = new Date()
    tokenDate.setDate(tokenDate.getDate() + 2);
    localStorage.setItem('adminData',JSON.stringify({uid, token, tokenExp: tokenDate.getDate()} ));
  }, [])

  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('adminData'))
    
    if (storedData && storedData.tokenExp === new Date().getDate()) {
      JSON.parse(localStorage.removeItem('adminData'))
      console.log('dfsd');
    }

    if (storedData && storedData.token) {
      login(storedData.uid, storedData.token)
      setLoggedIn(storedData.token)
    }
    
  }, [login, setLoggedIn])
  
    return (
      <>
        <div className="app_container">
          <BrowserRouter>
            <Switch> 
              <Route exact path="/">
                <HomePage login={login}/>
              </Route> 
              <Route exact path="/:id">
                <PatientDetailsPage/> 
              </Route>  
          {/* <Redirect to="/" /> */}
          </Switch>
          </BrowserRouter> 
        </div>
      </>
    );
}



export default App;
