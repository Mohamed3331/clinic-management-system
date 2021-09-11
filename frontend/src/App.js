import React, {useEffect, useCallback, Suspense} from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {LoggedUser} from './Atom/Atom'

import "./App.css";

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const PatientDetailsPage = React.lazy(() => import('./pages/PatientDetailsPage/PatientDetailsPage'))
const Page404 = React.lazy(() => import('./pages/404Page/Page404'))

function App () {
  const [isLoggedIn, setLoggedIn] = useRecoilState(LoggedUser)
  // const [tok] = useRecoilValue(Token)

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
                {isLoggedIn ? <PatientDetailsPage/> : <Redirect to="/" />} 
                </Route>  
                <Route>
                  <Page404/> 
                </Route>
            </Switch>
            </BrowserRouter> 
          </Suspense>
        </div>
      </>
    );
}



export default App;
