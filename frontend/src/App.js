import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";

import "./App.css";

const HomePage = React.lazy(() => import("./pages/HomePage/HomePage"));
const PatientDetailsPage = React.lazy(() =>
  import("./pages/PatientDetailsPage/PatientDetailsPage")
);
const NotFound = React.lazy(() => import("./pages/NotFound/NotFound"));

function App() {
  // const login = useCallback((uid, token) => {
  //   localStorage.setItem("adminData", JSON.stringify({ uid, token }));
  // }, []);

  // useEffect(() => {
  //   const storedData = JSON.parse(localStorage.getItem("adminData"));
  //   storedData && setLoggedIn(!!storedData.token);
  // }, [setLoggedIn]);

  // login={login}
  // {isLoggedIn ? <PatientDetailsPage /> : <Redirect to="/" />}
  return (
    <>
      <div className="app_container">

        <Suspense fallback={<LoadingSpinner />}>

          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/:id">
                <PatientDetailsPage />
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
