import React, {useEffect, useCallback, Suspense} from "react";
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import {LoggedUser} from './Atom/Atom'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner'
import "./App.css";

const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'))
const PatientDetailsPage = React.lazy(() => import('./pages/PatientDetailsPage/PatientDetailsPage'))
const NotFound = React.lazy(() => import('./pages/NotFound/NotFound'))

function App () {
  const [isLoggedIn, setLoggedIn] = useRecoilState(LoggedUser)

  const login = useCallback((uid, token) => {
    localStorage.setItem('adminData',JSON.stringify({uid, token} ));
  }, [])
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('adminData'))
    storedData && setLoggedIn(!!storedData.token)
  }, [setLoggedIn])
  
    return (
      <>
        <div className="app_container">
          <Suspense fallback={<LoadingSpinner/>}>
            <BrowserRouter>
              <Switch> 
                <Route exact path="/">
                  <HomePage login={login}/>
                </Route> 
                <Route exact path="/:id">
                  {isLoggedIn ? <PatientDetailsPage/> : <Redirect to="/" />} 
                </Route>  
                <Route component={NotFound} />
            </Switch>
            </BrowserRouter> 
          </Suspense>
        </div>
      </>
    );
}



export default App;
