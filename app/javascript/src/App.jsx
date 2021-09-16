import React, { useEffect, useState } from "react";

import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Login from "./components/Authentication/Login";
import PrivateRoute from "./components/Common/PrivateRoute";
import Dashboard from "./components/Dashboard";

const App = ({ user }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <UserContext.Provider value={user}>
      <Router>
        <ToastContainer />
        <Switch>
          <PrivateRoute
            path="/dashboard"
            redirectRoute="/login"
            condition={user}
            component={Dashboard}
            user={user}
          />
          <PrivateRoute
            exact
            path="/login"
            redirectRoute="/dashboard"
            condition={!user}
            component={Login}
          />
          <Redirect from="/" to="/login" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};
export const UserContext = React.createContext({});

export default App;
