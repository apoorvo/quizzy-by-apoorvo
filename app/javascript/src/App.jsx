import React, { useEffect, useState } from "react";

import { Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";

import Login from "./components/Authentication/Login";
import PrivateRoute from "./components/Common/PrivateRoute";
import Dashboard from "./components/Dashboard";

const App = ({ user }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <UserContext.Provider value={user}>
      <Router>
        <Switch>
          <PrivateRoute
            path="/"
            exact
            redirectRoute="/login"
            condition={user}
            component={Dashboard}
            user={user}
          />
          <PrivateRoute
            exact
            path="/login"
            redirectRoute="/"
            condition={!user}
            component={Login}
          />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
};
export const UserContext = React.createContext({});

export default App;
