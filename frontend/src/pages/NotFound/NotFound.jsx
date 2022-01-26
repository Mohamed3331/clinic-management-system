import React from "react";
import { Link } from "react-router-dom";

import "./NotFound.css";

const NotFound = () => {
  return (
    <>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Oops, The Page you are looking for can't be found!</h2>
          <Link to="/">
            <span class="arrow"></span>Return To Homepage
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
