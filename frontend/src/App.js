import React, {useEffect, useCallback, Suspense} from "react";
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import {LoggedUser, Token} from './Atom/Atom'

import "./App.css";

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const PatientDetailsPage = React.lazy(() => import('./pages/PatientDetailsPage/PatientDetailsPage'))

function App () {
  const [isLoggedIn, setLoggedIn] = useRecoilState(LoggedUser)
  const [tok] = useRecoilValue(Token)

  const login = useCallback((uid, token) => {
    localStorage.setItem('adminData',JSON.stringify({uid, token} ));
  }, [])
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('adminData'))
    setLoggedIn(!!storedData.token)
  }, [setLoggedIn])
  
    return (
      <>
        <div className="app_container">
          <Suspense fallback={<div>Loading Content</div>}>
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
          </Suspense>
        </div>
      </>
    );
}



export default App;
