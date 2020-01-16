import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Login from "./components/Login";
import BubblePage from "./components/BubblePage.js";
import "./styles.scss";

function App() {

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={Login} />
        <PrivateRoute path='/bubblepage' component={BubblePage} />
      </div>
    </Router>
  );
}

export default App;
